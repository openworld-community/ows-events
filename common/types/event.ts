export type EventOnPoster = {
  id: string;
  title: string;
  description: string;
  date: number;
  durationInSeconds: number;
  location: {
    country: string,
    city: string
  };
  image: string | null;
  price: number;
};

export type NewEventOnPoster = {
  title: string;
  description: string;
  date: number;
  durationInSeconds: number;
  location: {
    country: string,
    city: string
  };
  image: string | null;
  price: number;
};