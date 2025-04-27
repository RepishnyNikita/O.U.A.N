export default function showEventNotification(
  startEvents = false,
  iconEvents = "icon/noEvents.png",
  duration = false
) {
  const container = document.querySelector("[data-js-event-notification]");
  return (container.innerHTML = `
        <img src='${iconEvents}' width="40" height="40"/>
        <span class="event-notification__timer" data-js-event-timer>${
          !startEvents || !duration ? "" : "00"
        }</span>
    `);
}
