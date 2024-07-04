export interface DataObject<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {};
  size: number;
  sort: {};
  totalElements: number;
  totalPages: number;
}

export interface Cinema {
  id: number;
  name: string;
}

export interface CinemaWithScreens extends Cinema {
  screens: Screen[];
}

export interface Screen {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  name: string;
  runtime: number;
}

export interface Booking {
  seat: number;
  id: string;
  // some fields here, API incomplete
}

export interface Screening {
  id: number;
  cinemaName: string;
  screenName: string;
  start: Date;
  movie: Movie;
}

// export interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   bookings: Booking[];
// }
