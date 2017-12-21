export interface Item {
    _id: string,
    data: {
        count: string,
        group: string,
        id: string,
        priceBuy: string,
        priceCell: string,
        prices: [
            {
                pric: string,
                count: string
            }
        ]
    }
}