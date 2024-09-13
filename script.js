// Function to check the current day and time, highlight the upcoming class, and update the header
function checkClassReminder() {
    const currentTime = new Date();
    const currentDay = currentTime.toLocaleString('en-us', { weekday: 'long' });
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentAMPM = currentHour >= 12 ? 'PM' : 'AM';
    const currentFormattedTime = `${(currentHour % 12 || 12)}:${currentMinute.toString().padStart(2, '0')} ${currentAMPM}`;

    let nextClassFound = false;
    let nextClass = null;

    // Remove any previous highlights
    document.querySelectorAll('td').forEach(cell => {
        cell.classList.remove('highlight');
    });

    // Loop through the timetable and find the upcoming class
    document.querySelectorAll('td[data-day]').forEach(cell => {
        const classDay = cell.getAttribute('data-day');
        const classTime = cell.getAttribute('data-time');

        if (isUpcomingClass(currentDay, currentFormattedTime, classDay, classTime)) {
            if (!nextClassFound || isEarlier(classTime, nextClass.getAttribute('data-time'))) {
                nextClassFound = true;
                nextClass = cell;
            }
        }
    });

    // If an upcoming class is found, highlight it and update the header
    if (nextClass) {
        nextClass.classList.add('highlight');
        document.querySelector('h1').textContent = `Next Class: ${nextClass.textContent} at ${nextClass.getAttribute('data-time')} (${nextClass.getAttribute('data-day')})`;
    } else {
        document.querySelector('h1').textContent = "No upcoming classes for today!";
    }
}

// Helper function to check if a class is upcoming
function isUpcomingClass(currentDay, currentTime, classDay, classTime) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = daysOfWeek.indexOf(currentDay);
    const classDayIndex = daysOfWeek.indexOf(classDay);

    if (classDayIndex < currentDayIndex) {
        return false; // Class is in the past
    } else if (classDayIndex === currentDayIndex) {
        return isLater(classTime, currentTime); // Check if class is later today
    } else {
        return true; // Class is on a future day
    }
}

// Helper function to check if classTime is later than currentTime
function isLater(classTime, currentTime) {
    return new Date(`1970/01/01 ${classTime}`) > new Date(`1970/01/01 ${currentTime}`);
}

// Helper function to check if one time is earlier than another
function isEarlier(time1, time2) {
    return new Date(`1970/01/01 ${time1}`) < new Date(`1970/01/01 ${time2}`);
}

// Check for upcoming class every minute
setInterval(checkClassReminder, 60000);

// Initial call to checkClassReminder on page load
checkClassReminder();
