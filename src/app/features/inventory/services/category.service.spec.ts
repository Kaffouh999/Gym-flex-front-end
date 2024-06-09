import { TestBed } from "@angular/core/testing";
import { Category } from "src/app/core/models/Category";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { CategoryService } from "./category.service";

describe("CategoryService", () => {
    let service: CategoryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CategoryService],
        });
        service = TestBed.inject(CategoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should retrieve all categories", () => {
        const categories: Category[] = [
            {
                id: 1,
                name: "Category 1",
                description: "Description 1",
                isForClient: false,
                isForInventory: false,
            },
            {
                id: 2,
                name: "Category 2",
                description: "Description 2",
                isForClient: true,
                isForInventory: false,
            },
            {
                id: 3,
                name: "Category 3",
                description: "Description 3",
                isForClient: false,
                isForInventory: true,
            },
        ];

        service.getAllCategories().subscribe((data) => {
            expect(data).equal(categories);
        });

        const req = httpMock.expectOne("http://localhost:8081/api/categories");
        //expect(req.request.method).toBe("GET");
        req.flush(categories);
    });

    it("should add a category", () => {
        const category: Category = {
            id: 1,
            name: "Category 1",
            description: "Description 1",
            isForClient: false,
            isForInventory: false,
        };

        service.addCategory(category).subscribe((data) => {
            expect(data).equal(category);
        });

        const req = httpMock.expectOne("http://localhost:8081/api/categories");
        //expect(req.request.method).toBe("POST");
        expect(req.request.body).equal(category);
        req.flush(category);
    });

    it("should delete a category", () => {
        const category: Category = {
            id: 1,
            name: "Category 1",
            description: "Description 1",
            isForClient: false,
            isForInventory: false,
        };
        const categoryId = 1;
        //service.deleteCategory(category).subscribe((response) => {
          //  expect(response).toBeTruthy();
        //});

        const req = httpMock.expectOne(
            `http://localhost:8081/api/categories/${categoryId}`
        );
        //expect(req.request.method).toBe("DELETE");
        req.flush({ success: true });
    });

    it("should update a category", () => {
        const updatedCategory: Category = {
            id: 1,
            name: "Updated Category",
            description: "Description 1",
            isForClient: false,
            isForInventory: false,
        };
        const categoryId = 1;
        service
            .updateCategory(categoryId, updatedCategory)
            .subscribe((response) => {
                expect(response).equal(updatedCategory);
            });

        const req = httpMock.expectOne(
            `http://localhost:8081/api/categories/${categoryId}`
        );
        //expect(req.request.method).toBe("PUT");
        expect(req.request.body).equal(updatedCategory);
        req.flush(updatedCategory);
    });
});
