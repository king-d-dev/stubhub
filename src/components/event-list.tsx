import { useState } from "react";
import eventData from "../data/events.json";
import { IEvent } from "../interfaces/event";
import { Event } from "./event";

export const EventList = () => {
  const [cityName, setCityName] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [events, setEvents] = useState(eventData.events);

  const filterByCityName = (event: IEvent) => {
    return !!cityName.trim()
      ? event.city.toLowerCase().includes(cityName.toLowerCase())
      : true;
  };

  const filterByPrice = (event: IEvent) =>
    price ? event.price <= price : true;

  const filterEvents = (e: React.FormEvent) => {
    e.preventDefault();
    const hasCityNameInSearch = cityName.trim();

    if (!price && !hasCityNameInSearch) {
      // reset the list of events to the initial data if no value was entered in the search fields
      setEvents(eventData.events);
      return;
    }

    const filteredEvents = eventData.events
      .filter(filterByCityName)
      .filter(filterByPrice);

    console.log(filteredEvents);
    setEvents(filteredEvents);
  };

  return (
    <div className="event-list">
      <h2>Events</h2>

      <form className="filters">
        <input
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          type="text"
          placeholder="filter by city name"
        />
        <input
          value={price || ""}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          type="number"
          placeholder="filter by prices greater or equal to"
        />
        <button onSubmit={filterEvents} onClick={filterEvents}>
          Filter
        </button>
      </form>

      <div className="spacer" />

      <div className="events">
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}

        {!events.length ? <p>No results found</p> : null}
      </div>
    </div>
  );
};
