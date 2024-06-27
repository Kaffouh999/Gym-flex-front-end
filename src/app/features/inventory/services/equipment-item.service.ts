import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EquipemntItem } from "src/app/core/models/EquipmentItem";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class EquipmentItemService {
    equipmentItemURL = environment.API_URL + "/equipment-items";
    constructor(private http: HttpClient) {}

    getAllEquipmentItems() {
        return this.http.get(this.equipmentItemURL);
    }
    addEquipmentItem(equipmentItem: EquipemntItem) {
        return this.http.post(this.equipmentItemURL, equipmentItem);
    }
    deleteEquipmentItem(equipmentItem: EquipemntItem) {
        return this.http.delete(this.equipmentItemURL + "/" + equipmentItem.id);
    }
    updateEquipmentItem(id: number, equipmentItem: EquipemntItem) {
        return this.http.put(this.equipmentItemURL + "/" + id, equipmentItem);
    }

    getByQrCode(qrCode: string) {
        return this.http.get(this.equipmentItemURL + "/qrCode/" + qrCode);
    }
}
