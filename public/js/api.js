async function getCalendarEvents() {
    const response = await fetch('/api/calendar');
    const events = await response.json();
    return events;
}
async function postCalendarEvents(body) {
    const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    return response;
}
async function updateCalendarEvent(eventId, updatedEvent) {
    const response = await fetch(`/api/calendar/${eventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent)
    });
    return response;
}
async function deleteCalendarEvent(eventId) {
    const response = await fetch(`/api/calendar/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response;
}