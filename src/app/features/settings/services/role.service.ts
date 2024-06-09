import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Role } from "src/app/core/models/Role";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class RoleService {
    roleURL = environment.API_URL + "/roles";
    constructor(private http: HttpClient) {}

    public getAllRoles() {
        return this.http.get(this.roleURL);
    }

    public getRoleById(id: number) {
        return this.http.get(this.roleURL + "/" + id);
    }

    public addRole(role: Role) {
        return this.http.post(this.roleURL, role);
    }

    public updateRole(id: number, role: Role) {
        return this.http.put(this.roleURL + "/" + id, role);
    }

    public deleteRole(id: number) {
        return this.http.delete(this.roleURL + "/" + id);
    }
}
