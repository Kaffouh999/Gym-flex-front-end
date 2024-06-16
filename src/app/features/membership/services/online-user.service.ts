import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OnlineUser } from "src/app/core/models/OnlineUser";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class OnlineUserService {
    onlineUserURL = environment.API_URL + "/online-users";
    constructor(private http: HttpClient) {}

    public getAllUsers() {
        return this.http.get(this.onlineUserURL);
    }

    public getUserById(id: number) {
        return this.http.get(this.onlineUserURL + "/" + id);
    }

    public addUser(onlineUser: OnlineUser) {
        return this.http.post(this.onlineUserURL, onlineUser);
    }

    public updateUser(id: number, onlineUser: OnlineUser) {
        return this.http.put(this.onlineUserURL + "/" + id, onlineUser);
    }

    public deleteUser(id: number) {
        return this.http.delete(this.onlineUserURL + "/" + id);
    }
    uploadImage(name: String, formData: FormData) {
        return this.http.post(
            environment.API_URL + "/online-users/upload/" + name,
            formData
        );
    }
    updateImage(id: number, formData: FormData) {
        return this.http.put(
            environment.API_URL + "/online-users/upload/" + id,
            formData
        );
    }
}
