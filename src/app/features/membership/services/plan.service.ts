import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Plan } from "src/app/core/models/Plan";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class PlanService {
    planURL = environment.API_URL + "/plans";
    constructor(private http: HttpClient) {}

    public getAllPlans() {
        return this.http.get(this.planURL);
    }

    public getPlanById(id: number) {
        return this.http.get(this.planURL + "/" + id);
    }

    public addPlan(plan: Plan) {
        return this.http.post(this.planURL, plan);
    }

    public updatePlan(id: number, plan: Plan) {
        return this.http.put(this.planURL + "/" + id, plan);
    }

    public deletePlan(id: number) {
        return this.http.delete(this.planURL + "/" + id);
    }
    uploadImage(name: String, formData: FormData) {
        return this.http.post(this.planURL + "/upload/" + name, formData);
    }
    updateImage(id: number, formData: FormData) {
        return this.http.put(this.planURL + "/upload/" + id, formData);
    }
}
