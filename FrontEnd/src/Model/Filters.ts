import { Dayjs } from "dayjs";

export interface IFilters {
  selectedTrip: string;
  cityFrom: string;
  cityTo: string;
  departDate: Dayjs | null;
  returnDate: Dayjs | null;
  allTravelers: ITravelers;
}

export interface IFiltersError {
  isErrorCityFrom: boolean;
  isErrorCityTo: boolean;
  isErrorDepartDate: boolean;
}

export interface ITravelers {
  adults: number;
  children: number;
  infants: number;
}
