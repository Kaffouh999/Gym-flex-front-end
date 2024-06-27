import { Category } from "./Category";

export interface SubCategory {
    id: number | undefined;
    name: string;
    description: string;
    category: Category;
}
