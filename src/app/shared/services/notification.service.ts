import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Notification } from "src/app/core/models/Notification";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class NotificationService {
    notificationURL = environment.API_URL + "/notifications";
    constructor(private http: HttpClient) {}

    getAllNotifications() {
        return this.http.get(this.notificationURL);
    }

    addNotification(notification: Notification) {
        return this.http.post(this.notificationURL, notification);
    }
    deleteNotification(notification: Notification) {
        return this.http.delete(this.notificationURL + "/" + notification.id);
    }
    markAsRead() {
        return this.http.put(this.notificationURL + "/read", {});
    }
}
