import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  currentLang : string;
  languages : String[]=['en','ar','fr'];

  constructor( private translateService: TranslateService) {
   this.initToDefaultEng();
   }

   initToDefaultEng(){
    const storedLang = localStorage.getItem('currentLang');
    if (storedLang) {
      this.currentLang = storedLang;
      if (this.currentLang === 'ar') {
        document.body.dir = 'rtl';
      }else{
        document.body.dir = 'ltr';
      }
    }else{
      this.currentLang = 'en';
    }
    this.translateService.use(this.currentLang);
    console.log("using ... "+this.currentLang);
   }
 
   switchLanguage(lang: string) {
    // Set the current language and direction based on the selected language
    this.translateService.use(lang);
    this.currentLang = lang;
    if (lang === 'ar') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
    localStorage.setItem('currentLang', lang);
  }

}
