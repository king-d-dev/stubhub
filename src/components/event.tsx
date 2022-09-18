import { IEvent } from "../interfaces/event";

type EventProps = { event: IEvent };

export const Event = ({ event }: EventProps) => {
  return (
    <div id={event.id.toString()} className="event-card">
      <img src="https://picsum.photos/280/140" alt="event-photo" />

      <div className="event-card__text-content">
        <p className="event-card__name">{event.name}</p>

        <div className="event-card__city">
          <img src="/location.png" alt="location icon" />
          <p>{event.city}</p>
        </div>

        <p className="event-card__price">
          <span>Price:</span> &nbsp; ${event.price}
        </p>
        <p className="event-card__artiste">
          <span>Featuring:</span> &nbsp; {event.artiste}
        </p>

        {/* <div>
          <p className="event-card__artiste-title">Featuring:</p>
          <p className="event-card__artiste-value">{event.artiste}</p>
        </div> */}
        {/* <p>{event.description}</p> */}
      </div>
    </div>
  );
};
