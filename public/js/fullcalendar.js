document.addEventListener('DOMContentLoaded',async function() {
    const calendarEl = document.getElementById('calendar');
    
    const events = await getCalendarEvents();

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
        timeZone: 'UTC',
        editable: true,
        eventResizableFromStart: true, // Whether the user can resize an event from its starting edge.
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
        eventClick: function(info) {
            console.log(info.el)
            // TODO: Give options - Update or Delete this Event
            let answer = confirm('do you want to delete?')
            if(answer){
                var event = calendar.getEventById(info.event._def.publicId)
                event.remove()
            }
            info.el.style.borderColor = 'red';
        },
        // TODO: Get Events a specific user has
        events: events,

        // CallBack function
        eventAdd:function (addInfo) {
            console.log(addInfo)
        },
        eventChange: function (changeInfo) {
            console.log(changeInfo)
        },
        eventRemove: function (eventRemove) {
            console.log(eventRemove)
        }
    });
    calendar.render();
    // var event = calendar.getEventById('a')
    // event.remove()
});

