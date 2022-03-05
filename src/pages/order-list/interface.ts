export interface IOrderTime {
    orderCreateTime: string;
    list: Array<IOrderInfo>;
}

export interface IOrderInfo {
    orderId: number;
    orderName: string; //景点名+票名拼接
    orderTotal: number;
    orderStatus: string;
    orderCreateTime: string;
    orderuseTime: string;
    orderTicket: Array<ITicketInfo>;
}

export interface ITicketInfo {
    ticketId: number;
    ticketName: string;
    ticketNum: number;
}