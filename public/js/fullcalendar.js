document.addEventListener('DOMContentLoaded',async function() {
    const calendarEl = document.getElementById('calendar');
    
    // Get all events from DB.
    const events = await getCalendarEvents(); 
    let eventID;

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
            eventID = uuidv4();
            if(event != null && event != ""){
                console.log(uuidv4())
                calendar.addEvent({
                    id: eventID,
                    title: event,
                    start: info.dateStr,
                    allDay: info.allDay
                });
            }
        },
        eventClick: function(info) {
            let answer = confirm('do you want to delete?')
            if(answer){
                var event = calendar.getEventById(info.event._def.publicId)
                event.remove()
            }
        },
        events: events,

        // CallBack function
        eventAdd:async function (addInfo) {
            const newEvent = {
                "id": eventID,
                "title": addInfo.event.title,
                "start": addInfo.event.startStr,
                "allDay": true
            }
            await postCalendarEvents(newEvent);
        },
        eventChange: async function (changeInfo) {
            const selectedEventId = changeInfo.event._def.publicId;
            const updatedEvent = {
                "id": changeInfo.event._def.publicId, 
                "title": changeInfo.event.title,
                "start": changeInfo.event.startStr,
                "end": changeInfo.event.endStr,
                "allDay": true
            }
            await updateCalendarEvent(selectedEventId, updatedEvent);
        },
        eventRemove: async function (eventRemove) {
            let selectedEventId = eventRemove.event._def.publicId
            await deleteCalendarEvent(selectedEventId);
        }
    });
    calendar.render();
});

