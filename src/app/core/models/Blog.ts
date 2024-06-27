import { CategoryBlog } from "./CategoryBlog";

export interface Blog {
    id: number | undefined;
    name:string;

    description:string;
    title: string;
    body: string;
    dateCreation: Date;
    categoryBlog: CategoryBlog;
    headerImage: string;
}
