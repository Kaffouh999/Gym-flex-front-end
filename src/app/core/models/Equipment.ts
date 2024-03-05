import { SubCategory } from "./SubCategory";

export interface Equipemnt {
    id: number | undefined;
    name: string;
    description: string;
    imageUrl: string;
    subCategory: SubCategory | undefined;
}
