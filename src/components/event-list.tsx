import { useEffect, useState } from "react";
import eventData from "../data/events.json";
import { IEvent } from "../interfaces/event";
import { Event } from "./event";

export const EventList = () => {
  const [cityName, setCityName] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [events, setEvents] = useState(eventData.events);
  const [showCheapest, setShowCheapest] = useState<boolean>(false);

  const filterByCityName = (event: IEvent) => {
    return !!cityName.trim()
      ? event.city.toLowerCase().includes(cityName.toLowerCase())
      : true;
  };

  const filterByPrice = (event: IEvent) =>
    price ? event.price <= price : true;

  const filterEvents = (e?: React.FormEvent) => {
    e?.preventDefault();
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

  const filterByCheapest = () => {
    let cheapest = events[0].price;

    events.forEach((event) => {
      if (event.price < cheapest) {
        cheapest = event.price;
      }
    });

    const cheapestEvents = events.filter((event) => event.price === cheapest);
    setEvents(cheapestEvents);
  };

  const toggleCheapest = () => {
    setShowCheapest(!showCheapest);
  };

  useEffect(() => {
    filterEvents();
  }, [cityName, price]);

  useEffect(() => {
    if (showCheapest) {
      filterByCheapest();
    } else {
      setEvents(eventData.events);
    }
  }, [showCheapest]);

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
        <div>
          <input
            checked={showCheapest}
            onChange={toggleCheapest}
            type="checkbox"
            name="showOnlyCheapest"
            id="showOnlyCheapest"
          />
          <label htmlFor="showOnlyCheapest">Show Cheapest</label>
        </div>
        {/* <button onSubmit={filterEvents} onClick={filterEvents}>
          Filter
        </button> */}
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
