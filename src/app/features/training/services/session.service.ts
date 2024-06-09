import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionMember } from "src/app/core/models/SessionMember";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class SessionService {
    sessionURL = environment.API_URL + "/session-members";
    constructor(private http: HttpClient) {}

    public getAllSessionMembers() {
        return this.http.get(this.sessionURL);
    }

    public getSessionMemberById(id: number) {
        return this.http.get(this.sessionURL + "/" + id);
    }

    public getSessionsByMemberId(id: number) {
        return this.http.get(
            this.sessionURL + "/web/session-members/member/" + id
        );
    }

    public addSessionMember(sessionMember: SessionMember) {
        return this.http.post(this.sessionURL, sessionMember);
    }

    public updateSessionMember(id: number, sessionMember: SessionMember) {
        return this.http.put(this.sessionURL + "/" + id, sessionMember);
    }

    public deleteSessionMember(id: number) {
        return this.http.delete(this.sessionURL + "/" + id);
    }

    public canEnter(codeSubscription: string) {
        return this.http.get(this.sessionURL + "/entering/" + codeSubscription);
    }

    public playWelcomAudio() {
        let audio = new Audio();
        const storedLang = localStorage.getItem("currentLang");
        if (storedLang) {
            if (storedLang == "en") {
                audio.src = "assets/audio/gymflewWelcom.mp3";
            } else if (storedLang == "ar") {
                audio.src = "assets/audio/gymflewWelcomArabic.mp3";
            } else if (storedLang == "fr") {
                audio.src = "assets/audio/GymFlewWelcomFrensh.mp3";
            }
        } else {
            audio.src = "assets/audio/gymflewWelcom.mp3";
        }
        audio.play();
    }
    public playGoodbyeAudio() {
        let audio = new Audio();

        const storedLang = localStorage.getItem("currentLang");
        if (storedLang) {
            if (storedLang == "en") {
                audio.src = "assets/audio/goodbye.mp3";
            } else if (storedLang == "ar") {
                audio.src = "assets/audio/goodByArabic.mp3";
            } else if (storedLang == "fr") {
                audio.src = "assets/audio/GoodByFrensh.mp3";
            }
        } else {
            audio.src = "assets/audio/goodbye.mp3";
        }
        audio.play();
    }
}
