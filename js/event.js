import { eventsStore } from "./event_data.js";

const mainContainer = document.querySelector(".main");
const sectionEvents = document.querySelector(".events_container_new");

function createEvent(event) {
  // ___________создаю контейнер для будущих эвентов__________
  const eventsAll = document.createElement("div");
  eventsAll.classList.add("all_events");
  const eventContainer = document.createElement("div");
  eventContainer.classList.add("event_container");
  const img = document.createElement("img");
  img.classList.add("img_event");
  img.setAttribute("src", event.image);
  img.setAttribute("alt", event.description);

  eventContainer.appendChild(img);
  const divEventText = document.createElement("div");
  divEventText.classList.add("div_event_element");
  const nameEventTitle = document.createElement("h3");
  nameEventTitle.textContent = event.title;
  nameEventTitle.classList.add("name_event");
  const categoryEventParagraph = document.createElement("p");
  categoryEventParagraph.classList.add("category_event");
  categoryEventParagraph.textContent =
    event.category + ` (${event.distance} km)`;
  const dateEventParagraph = document.createElement("p");
  dateEventParagraph.classList.add("date_event");
  dateEventParagraph.textContent = formatDate(event.date);
  const attendees = document.createElement("p");
  attendees.classList.add("attendees");
  if (event.attendees) {
    attendees.textContent = event.attendees + " attendes";
  }
  divEventText.append(
    dateEventParagraph,
    nameEventTitle,
    categoryEventParagraph,
    attendees
  );
  eventContainer.append(divEventText);
  return eventContainer;
}
// _______отрисовываю эвент_____
function renderEvents(arr) {
  if (sectionEvents.hasChildNodes) {
    sectionEvents.innerHTML = "";
  }
  arr.forEach((e) => {
    sectionEvents.append(createEvent(e));
    // console.log(e);
  });
}
// ____делаем формат даты______
function formatDate(date) {
  const weekDay = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const dayNumber = date.toLocaleDateString("en-US", { day: "numeric" });
  const hours = date.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    timeZoneName: "short",
  });
  return `${weekDay}, ${month} ${dayNumber} · ${hours}`;
}

// ________фильтр_______

// _______засовываем категориив селекты____
const selects = document.querySelectorAll("select");

selects.forEach((e) => {
  e.addEventListener("change", () => {
    console.log(getOptions());
    console.log(filterEvents(getOptions(), eventsStore));
    renderEvents(filterEvents(getOptions(), eventsStore));
  });
});

function getOptions() {
  const type = document.querySelector(".type_filter");
  const distance = document.querySelector(".filter_distance");
  const category = document.querySelector(".category_filter");
  const options = {
    type: type.value,
    distance: Number(distance.value) || "any",
    category: category.value,
  };
  return options;
}

function filterEvents(options, events) {
  const filteredEvents = events
    .filter((e) => {
      if (options.type === "any" || options.type === e.type) {
        return true;
      }
    })
    .filter((e) => {
      if (options.distance === "any" || options.distance === e.distance) {
        return true;
      }
    })
    .filter((e) => {
      if (options.category === "any" || options.category === e.category) {
        return true;
      }
    });
  return filteredEvents;
}

renderEvents(eventsStore);
