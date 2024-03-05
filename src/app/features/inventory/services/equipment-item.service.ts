import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EquipemntItem } from "src/app/core/models/EquipmentItem";

@Injectable({
    providedIn: "root",
})
export class EquipmentItemService {
    constructor(private http: HttpClient) {}

    getAllEquipmentItems() {
        return this.http.get("http://localhost:8080/api/equipment-items");
    }
    addEquipmentItem(equipmentItem: EquipemntItem) {
        return this.http.post(
            "http://localhost:8080/api/equipment-items",
            equipmentItem
        );
    }
    deleteEquipmentItem(equipmentItem: EquipemntItem) {
        return this.http.delete(
            "http://localhost:8080/api/equipment-items/" + equipmentItem.id
        );
    }
    updateEquipmentItem(id: Number, equipmentItem: EquipemntItem) {
        return this.http.put(
            "http://localhost:8080/api/equipment-items/" + id,
            equipmentItem
        );
    }

    getByQrCode(qrCode:string){
       return this.http.get("http://localhost:8080/api/equipment-items/qrCode/"+qrCode);
    }
}
