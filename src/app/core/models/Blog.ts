import { CategoryBlog } from "./CategoryBlog";
import { Member } from "./Member";

export interface Blog {
    id: number | undefined;
    name:String;

    description:String;
    title: String;
    body: String;
    dateCreation: Date;
    categoryBlog: CategoryBlog;
    headerImage: String;
}
