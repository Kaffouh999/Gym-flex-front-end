import { SubCategory } from "./SubCategory";

export interface Product {
    id: number | undefined;
    name: string;
    description: string | undefined;
    price: number;
    imageUrl: string;
    rating: number;
    qteinSTock: number;
    discount: number;
    subCategory: SubCategory;
}
