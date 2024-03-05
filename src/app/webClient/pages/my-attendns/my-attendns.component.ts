import { Component, OnInit } from '@angular/core';
import { SessionMember } from 'src/app/core/models/SessionMember';
import { SessionService } from 'src/app/features/training/services/session.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-my-attendns',
  templateUrl: './my-attendns.component.html',
  styleUrls: ['./my-attendns.component.scss']
})
export class MyAttendnsComponent implements OnInit{

  mySessions:SessionMember[]=[];

  constructor(private sessionService:SessionService,private authService:AuthService){}

  ngOnInit(): void {
    let idUserAuth : number = this.authService.getAuthUser().id;

      this.getMySessions(idUserAuth); 
 }

  getMySessions(id:number){
      this.sessionService.getSessionsByMemberId(id).subscribe((res:any) => {
        this.mySessions = res as SessionMember[];
      })
  }
}
