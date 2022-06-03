document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
        timeZone: 'UTC',
        editable: true,
        dayMaxEvents: true, // when too many events in a day, show the popover
        dateClick: function(info) {
            var event = prompt('Enter Your Event');
            if(event != null && event != ""){
                calendar.addEvent({
                    title: event,
                    start: info.dateStr,
                    allDay: true
                });
            }
            //TODO: Call Database to store this event
        },
        // TODO: Get Events a specific user has
        events: [
            {
                id: 'a',
                title: 'my event',
                start: '2022-06-03 15:00:00',
                end: '2022-06-04 10:00:00'
            }
        ]
    });
    calendar.render();
    
    // var event = calendar.getEventById('a')
    // event.remove()
});

