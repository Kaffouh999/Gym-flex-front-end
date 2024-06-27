import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subscription } from "src/app/core/models/Subscription";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class SubscriptionService {
    subscriptionURL = environment.API_URL + "/subscription-members";
    constructor(private http: HttpClient) {}

    public getAllSubscriptions() {
        return this.http.get(this.subscriptionURL);
    }

    public getSubscriptionById(id: number) {
        return this.http.get(this.subscriptionURL + "/" + id);
    }
    public getSubscriptionByQrCode(qrCode: String) {
        return this.http.get(this.subscriptionURL + "/qrcode/" + qrCode);
    }

    public addSubscription(subscription: Subscription) {
        return this.http.post(this.subscriptionURL, subscription);
    }

    public updateSubscription(id: number, subscription: Subscription) {
        return this.http.put(this.subscriptionURL + "/" + id, subscription);
    }

    public deleteSubscription(id: number) {
        return this.http.delete(this.subscriptionURL + "/" + id);
    }
    public searchSubscriptions(subscription: Subscription) {
        return this.http.post(this.subscriptionURL + "/search", subscription);
    }
    public getMemberCard(id: number): Observable<Blob> {
        return this.http.get(`${this.subscriptionURL}/printMemberCard/` + id, {
            responseType: "blob",
        });
    }
}
