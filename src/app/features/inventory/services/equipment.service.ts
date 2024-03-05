import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipemnt } from 'src/app/core/models/Equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http : HttpClient) { }

  getAllEquipment() {
    return this.http.get("http://localhost:8080/api/equipment");
}

getEquippmentStatistics(){
    return this.http.get("http://localhost:8080/api/equipment/statistics");
}

addEquipment(equipment: Equipemnt) {
    return this.http.post(
        "http://localhost:8080/api/equipment",
        equipment
    );
}
deleteEquipment(equipment: Equipemnt) {
    return this.http.delete(
        "http://localhost:8080/api/equipment/" + equipment.id
    );
}
updateEquipment(id: Number, equipment: Equipemnt) {
    return this.http.put(
        "http://localhost:8080/api/equipment/" + id,
        equipment
    );
}
uploadImage(name : String,formData : FormData){
    return  this.http.post('http://localhost:8080/api/equipment/upload/'+name, formData);
}
updateImage(id : number,formData : FormData){
    return  this.http.put('http://localhost:8080/api/equipment/upload/'+id, formData);
}
}
