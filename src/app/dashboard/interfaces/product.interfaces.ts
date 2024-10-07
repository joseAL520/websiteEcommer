export interface Products {
    id?:          number;
    title:       string;
    price:       number;
    description: string;
    category:    Category;
    image:       string;
    rate:        number;
    count?:      number;
    selected:   boolean;
    cantiSelect?: number;
}

export enum Category {
    Electronics = "electronics",
    Jewelery = "jewelery",
    MenSClothing = "men's clothing",
    WomenSClothing = "women's clothing",
}