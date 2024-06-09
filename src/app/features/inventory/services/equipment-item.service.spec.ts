import { HttpClientModule } from "@angular/common/http";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { EquipemntItem } from "src/app/core/models/EquipmentItem";

import { EquipmentItemService } from "./equipment-item.service";

describe("EquipmentItemService", () => {
    let service: EquipmentItemService;

    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, HttpClientModule],
            providers: [EquipmentItemService],
        });
        service = TestBed.inject(EquipmentItemService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should retrieve all equipment items", () => {
        const equipmentItems = [
            {
                id: 1,
                firstUseDate: new Date(),
                price: 10,
                amortization: 2,
                bareCode: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                safeMinValue: 10,
                equipment: undefined,
                gymBranch: undefined,
            },
            {
                id: 2,
                firstUseDate: new Date(),
                price: 20,
                amortization: 2,
                bareCode: "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",
                safeMinValue: 10,
                equipment: undefined,
                gymBranch: undefined,
            },
        ];

        service.getAllEquipmentItems().subscribe((data) => {
            expect(data).toEqual(equipmentItems);
        });

        const req = httpMock.expectOne(
            "http://localhost:8081/api/equipment-items"
        );
        expect(req.request.method).toBe("GET");
        req.flush(equipmentItems);
    });

    it("should add a new equipment item", () => {
        const equipmentItem: EquipemntItem = {
            id: 1,
            firstUseDate: new Date(),
            price: 10,
            amortization: 2,
            bareCode: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            safeMinValue: 10,
            equipment: undefined,
            gymBranch: undefined,
        };

        service.addEquipmentItem(equipmentItem).subscribe((data) => {
            expect(data).toEqual(equipmentItem);
        });

        const req = httpMock.expectOne(
            "http://localhost:8081/api/equipment-items"
        );
        expect(req.request.method).toBe("POST");
        expect(req.request.body).toEqual(equipmentItem);
        req.flush(equipmentItem);
    });

    it("should delete an equipment item", () => {
        const equipmentItem: EquipemntItem = {
            id: 1,
            firstUseDate: new Date(),
            price: 10,
            amortization: 2,
            bareCode: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            safeMinValue: 10,
            equipment: undefined,
            gymBranch: undefined,
        };

        service.deleteEquipmentItem(equipmentItem).subscribe((data) => {
            expect(data).toBeNull();
        });

        const req = httpMock.expectOne(
            "http://localhost:8081/api/equipment-items/1"
        );
        expect(req.request.method).toBe("DELETE");
        req.flush(null);
    });

    it("should update an equipment item", () => {
        const id = 1;
        const updatedEquipmentItem: EquipemntItem = {
            id: 1,
            firstUseDate: new Date(),
            price: 10,
            amortization: 2,
            bareCode: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            safeMinValue: 10,
            equipment: undefined,
            gymBranch: undefined,
        };

        service
            .updateEquipmentItem(id, updatedEquipmentItem)
            .subscribe((data) => {
                expect(data).toEqual(updatedEquipmentItem);
            });

        const req = httpMock.expectOne(
            "http://localhost:8081/api/equipment-items/1"
        );
        expect(req.request.method).toBe("PUT");
        expect(req.request.body).toEqual(updatedEquipmentItem);
        req.flush(updatedEquipmentItem);
    });
});
