import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionMember } from 'src/app/core/models/SessionMember';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:HttpClient) { }

  public getAllSessionMembers(){
    return this.http.get('http://localhost:8080/api/session-members');
  }

  public getSessionMemberById(id:number){
    return this.http.get('http://localhost:8080/api/session-members/'+id);
  }

  public getSessionsByMemberId(id:number){
    return this.http.get('http://localhost:8080/api/web/session-members/member/'+id);
  }

  public addSessionMember(sessionMember : SessionMember){
    return this.http.post('http://localhost:8080/api/session-members',sessionMember);
  }

  public updateSessionMember(id:number , sessionMember:SessionMember){
    return this.http.put('http://localhost:8080/api/session-members/'+id , sessionMember);
  }

  public deleteSessionMember(id:number){
    return this.http.delete('http://localhost:8080/api/session-members/'+id);
  }

  public canEnter(codeSubscription : string){
    return this.http.get('http://localhost:8080/api/session-members/entering/'+codeSubscription)
  }

  public playWelcomAudio() {
    let audio = new Audio();
    const storedLang = localStorage.getItem('currentLang');
    if (storedLang) {
      if(storedLang == 'en'){
        audio.src = 'assets/audio/gymflewWelcom.mp3';
      }else if(storedLang == 'ar'){
        audio.src = 'assets/audio/gymflewWelcomArabic.mp3';
      }else if(storedLang == 'fr'){
        audio.src = 'assets/audio/GymFlewWelcomFrensh.mp3';
      }

    }else{
    audio.src = 'assets/audio/gymflewWelcom.mp3';
    }
    audio.play();
  }
  public playGoodbyeAudio() {
    let audio = new Audio();

    const storedLang = localStorage.getItem('currentLang');
    if (storedLang) {
      if(storedLang == 'en'){
        audio.src = 'assets/audio/goodbye.mp3';
      }else if(storedLang == 'ar'){
        audio.src = 'assets/audio/goodByArabic.mp3';
      }else if(storedLang == 'fr'){
        audio.src = 'assets/audio/GoodByFrensh.mp3';
      }
    }else{
    audio.src = 'assets/audio/goodbye.mp3';
    }
    audio.play();
  }
}
