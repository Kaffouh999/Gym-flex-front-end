import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Equipemnt } from "src/app/core/models/Equipment";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class EquipmentService {
    equipmentURL = environment.API_URL + "/equipment";
    constructor(private http: HttpClient) {}

    getAllEquipment() {
        return this.http.get(this.equipmentURL);
    }

    getEquippmentStatistics() {
        return this.http.get(this.equipmentURL + "/statistics");
    }

    addEquipment(equipment: Equipemnt) {
        return this.http.post(this.equipmentURL, equipment);
    }
    deleteEquipment(equipment: Equipemnt) {
        return this.http.delete(this.equipmentURL + "/" + equipment.id);
    }
    updateEquipment(id: Number, equipment: Equipemnt) {
        return this.http.put(this.equipmentURL + "/" + id, equipment);
    }
    uploadImage(name: String, formData: FormData) {
        return this.http.post(this.equipmentURL + "/upload/" + name, formData);
    }
    updateImage(id: number, formData: FormData) {
        return this.http.put(this.equipmentURL + "/upload/" + id, formData);
    }
}
