import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LoginUser } from "src/app/core/models/LoginUser";
import { OnlineUser } from "src/app/core/models/OnlineUser";
import jwt_decode from "jwt-decode";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private role: string[] = [];
    private authenticateUser: OnlineUser = {
        id: undefined,
        firstName: "",
        lastName: "",
        login: "",
        email: "",
        password: "",
        profilePicture: "",
        role: undefined,
    };
    private readonly accessTokenKey = "access_token";
    private readonly refreshTokenKey = "refresh_token";
    private readonly apiUrl: string;
    private accessToken$: BehaviorSubject<string> = new BehaviorSubject<string>(
        null
        );
        
        constructor(private http: HttpClient, private router: Router) {
            this.apiUrl = environment.API_URL + "/auth";
            this.getRoleFromToken();
    }

    getRoleFromToken() {
        const token: string = this.getAccessToken();
        if (token != null && token != undefined && token != "") {
            const decodedToken: { authorities: string[]; user: OnlineUser } =
                jwt_decode(token);
            this.authenticateUser = decodedToken.user;
            this.role = decodedToken.authorities;
        }
    }

    login(loginUser: LoginUser) {
        return this.http.post(`${this.apiUrl}/authenticate`, loginUser);
    }

    register(onlineUser: OnlineUser) {
        console.log("service auth called");
        return this.http.post(`${this.apiUrl}/register`, onlineUser);
    }

    refreshToken(): Observable<any> {
        const refreshToken = this.getRefreshToken();

        return this.http
            .post<any>(`${this.apiUrl}/refresh-token`, {
                refresh_token: refreshToken,
            })
            .pipe(
                tap((response) => {
                    localStorage.setItem(
                        this.accessTokenKey,
                        response.access_token
                    );
                    this.accessToken$.next(response.access_token);
                })
            );
    }

    logout(): void {
        this.http.post(`${this.apiUrl}/logout`, null).subscribe((res: any) => {
            localStorage.removeItem(this.accessTokenKey);
            localStorage.removeItem(this.refreshTokenKey);
            this.accessToken$.next(null);
            this.router.navigate(["/web/login"]);
        });
    }

    getAccessToken(): string {
        return localStorage.getItem(this.accessTokenKey);
    }

    getRefreshToken(): string {
        return localStorage.getItem(this.refreshTokenKey);
    }

    isLoggedIn(): boolean {
        const token = this.getAccessToken();
        return !!token;
    }
    getRol() {
        return this.role;
    }
    getAuthUser() {
        return this.authenticateUser;
    }
    //-------------------
}
