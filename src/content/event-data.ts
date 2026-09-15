import { getEvents, type Event } from "./event";

enum EventStatus {
  Upcoming = "upcoming",
  Past = "past",
}

const events: Event[] = (await getEvents()).toSorted(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);

export const upcomingEvents = events
  .filter(({ data }) => data.status === EventStatus.Upcoming)
  .toSorted((a, b) => a.data.date.getTime() - b.data.date.getTime());

export const pastEvents = events.filter(
  ({ data }) => data.status === EventStatus.Past
);
