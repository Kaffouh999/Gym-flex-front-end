import { Category } from "./Category";

export interface SubCategory {
    id: number | undefined;
    name: String;
    description: String;
    category: Category;
}
