import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from 'src/app/core/models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}

  getAllNotifications() {
      return this.http.get("http://localhost:8080/api/notifications");
  }

  addNotification(notification: Notification) {
      return this.http.post("http://localhost:8080/api/notifications", notification);
  }
  deleteNotification(notification: Notification) {
      return this.http.delete(
          "http://localhost:8080/api/notifications/" + notification.id
      );
  }
  markAsRead(){
    return this.http.put("http://localhost:8080/api/notifications/read",{});
  }
}
