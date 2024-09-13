// Create a list of class reminders based on the timetable
const classTimetable = [
    { day: 'Monday', time: '10:00 AM', subject: 'BCA 22 PC' },
    { day: 'Monday', time: '11:00 AM', subject: 'BCA 22 PC' },
    { day: 'Monday', time: '1:00 PM', subject: 'Bengali' },
    { day: 'Monday', time: '2:00 PM', subject: 'BCA SUK' },
    { day: 'Monday', time: '3:00 PM', subject: 'BCA SUK' },
    { day: 'Tuesday', time: '10:00 AM', subject: 'BCA 23 PR' },
    { day: 'Tuesday', time: '1:00 PM', subject: 'MATH 16' },
    { day: 'Tuesday', time: '2:00 PM', subject: 'BCA 25K' },
    { day: 'Wednesday', time: '10:00 AM', subject: 'SEL' },
    { day: 'Wednesday', time: '1:00 PM', subject: 'BCA DBMS PR' },
    { day: 'Wednesday', time: '2:00 PM', subject: 'BCA DBMS SEL' },
    { day: 'Wednesday', time: '3:00 PM', subject: 'BCA SEL PKW' },
    { day: 'Thursday', time: '10:00 AM', subject: 'BCA 23 PR' },
    { day: 'Thursday', time: '1:00 PM', subject: 'MATH 20' },
    { day: 'Thursday', time: '2:00 PM', subject: 'BCA 25K' },
    { day: 'Thursday', time: '3:00 PM', subject: 'BCA SUK' },
    { day: 'Friday', time: '1:00 PM', subject: 'MATH 20' },
    { day: 'Friday', time: '2:00 PM', subject: 'BCA SUK' },
    { day: 'Friday', time: '3:00 PM', subject: 'BCA PKW' }
];

// Function to check the current day and time, highlight the subject, and update the header
function checkClassReminder() {
    const currentTime = new Date();
    const currentDay = currentTime.toLocaleString('en-us', { weekday: 'long' });
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentAMPM = currentHour >= 12 ? 'PM' : 'AM';
    const currentFormattedTime = `${(currentHour % 12 || 12)}:${currentMinute.toString().padStart(2, '0')} ${currentAMPM}`;

    let classFound = false;

    classTimetable.forEach(classItem => {
        const cells = document.querySelectorAll(`td[data-day="${classItem.day}"][data-time="${classItem.time}"]`);
        
        // Remove previous highlights
        cells.forEach(cell => {
            cell.classList.remove('highlight');
        });

        // Check if the current time matches the class time
        if (classItem.day === currentDay && classItem.time === currentFormattedTime) {
            // Highlight the corresponding table cell
            cells.forEach(cell => {
                cell.classList.add('highlight');
            });

            // Update the header with the current class
            document.querySelector('h1').innerText = `Current Class: ${classItem.subject}`;
            classFound = true;
        }
    });

    // Reset the header if no class is found
    if (!classFound) {
        document.querySelector('h1').innerText = "College Timetable Reminder";
    }
}

// Check for class reminder every minute
setInterval(checkClassReminder, 60000);

// Log current time for debugging purposes
console.log(new Date().toLocaleString());

// Run the check immediately on page load
checkClassReminder();
