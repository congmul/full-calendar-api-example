async function getCalendarEvents() {
    const response = await fetch('/api/calendar');
    const events = await response.json();
    console.log(events)
    return events;
}