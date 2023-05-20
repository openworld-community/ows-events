import { EventOnPoster } from "@common/types/event";
import { v4 as uuid } from "uuid";
import { fileDBController } from "./file-db-controller";

export type FindEventParams = {
  searchLine?: string,
  city?: string,
  country?: string
}
class EventsStateController {
  _events: EventOnPoster[] = [];

  get events() {
    return this._events;
  }
  set events(value) {
    this._events = value;
  }

  constructor() {
    [1, 2, 3, 4, 5, 6, 7]
      .map((i) => {
        return {
          id: i.toString(),
          title: "title " + i.toString(),
          description: "description " + i.toString(),
          date: Date.now() + 1000 * 60 * 60 * 24,
          durationInSeconds: 60 * 60,
          image: "https://picsum.photos/200/300",
          location: {
            country: "country " + i.toString(),
            city: "city " + i.toString(),
          },
          price: 1,
        };
      })
      .forEach((event) => {
        this.addEvent(event);
      });
  }

  addEvent(event: EventOnPoster) {
    this.events.push({...event, id: uuid()});
    fileDBController.updateDB();
  }

  getEvents() {
    return this.events;
  }

  getEvent(id: string) {
    return this.events.find((event) => event.id === id);
  }

  updateEvent(data: EventOnPoster) {
    const event = this.getEvent(data.id);
    if (!event) {
      throw new Error("Event not found");
    }

    Object.assign(event, data);

    fileDBController.updateDB();
  }

  findEvents(query: FindEventParams) {
    let events = [...this.getEvents()];
    if (query.searchLine) {
      const lowerCaseSearchLine = query.searchLine.toLowerCase()
      events = events.filter(event => {
        return [event.title, event.description, event.location.country, event.location.city]
          .join(' ')
          .toLowerCase()
          .includes(lowerCaseSearchLine)
      })
    }
    if (query.country) {
      const lowerCaseCountry = query.country.toLowerCase()
      events = events.filter(event => event.location.country.toLowerCase() === lowerCaseCountry);
    }
    if (query.city) {
      const lowerCaseCity = query.city.toLowerCase()
      events = events.filter(event => event.location.city.toLowerCase() === lowerCaseCity);
    }
    return events
  }

  deleteEvent(id: string) {
    const index = this.events.findIndex((event) => event.id === id);
    this.events.splice(index, 1);
    fileDBController.updateDB();
  }
}


export const eventsStateController = new EventsStateController();
