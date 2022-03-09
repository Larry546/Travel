import { IPassengerInfo } from "src/common/traveler/edit/interface";
import { ITicketInfo } from "../spot-detail/interface";

export interface IBookingState {
    calendarOpen: boolean;
    selectedDate: string;
    listOpen: boolean;
    contact: string;
    orderTicketList?: Array<IOrderTicketInfo>;
    currentTicket?: IOrderTicketInfo;
    passengerlist: Array<IPassengerInfo>;
}

export interface IOrderTicketInfo extends ITicketInfo {
    ticketNum: number;
    passenger?: Array<number>;
}
