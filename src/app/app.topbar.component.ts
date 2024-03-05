import {Component, OnDestroy, OnInit} from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { BreadcrumbService } from './app.breadcrumb.service';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './shared/services/translation.service';
import { RxStompService } from './core/config/webSocket/rx-stomp.service';
import { NotificationService } from './shared/services/notification.service';
import { Notification } from './core/models/Notification';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers:[MessageService]
})
export class AppTopBarComponent implements OnDestroy,OnInit{

    subscription: Subscription;

    items: MenuItem[];
    notifs : Notification[]=[];
    notifNumber : string;

    selectedLanguage:string;

    constructor(public breadcrumbService: BreadcrumbService,private rxStompService: RxStompService,private messageService: MessageService, private notifiService:NotificationService,public app: AppComponent, public appMain: AppMainComponent , public translationService : TranslationService ) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });

        const storedLang = localStorage.getItem('currentLang');
        if (storedLang) {
        this.selectedLanguage = storedLang;
        }else{
            this.selectedLanguage = 'en';
        }
       
    }
    ngOnInit(): void {
        this.getallNotifs();

        this.rxStompService.watch('/topic/shouldLeave').subscribe((numNotif:any) => {
           this.getallNotifs();
        
       
        });    }


    swichLanguage(){
        this.translationService.switchLanguage(this.selectedLanguage);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    getallNotifs(){
        this.notifiService.getAllNotifications().subscribe((res:any) => {
            this.notifs = res;
            this.notifNumber = this.notifs.filter(notification => !notification.readed).length.toString();
            if(this.notifNumber === "0"){
                this.notifNumber="";
            }
        });

    }
    deleteNotif(notification:Notification){
        this.notifiService.deleteNotification(notification).subscribe((res:any) => {
            this.getallNotifs();
        });
    }
    markAsRead(){
        if(this.notifNumber != ""){
        this.notifiService.markAsRead().subscribe((res:any) => {
            this.getallNotifs();
        })
    }
    }
}
