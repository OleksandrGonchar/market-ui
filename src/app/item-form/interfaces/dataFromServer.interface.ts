interface PriceArrayItem {
    price: string;
    count: string;
}

export interface DataForServer {
    _id?: string;
    user: string;
    key: string;
    data: {
        id: string;
        group: string;
        priceBuy: string;
        count: string;
        prices: PriceArrayItem[];
    };
}
