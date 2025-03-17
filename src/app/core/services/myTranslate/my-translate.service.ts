import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  constructor(private translate: TranslateService,@Inject(PLATFORM_ID) private Id: object) {
    translate.setDefaultLang('en');
    
    if (isPlatformBrowser(Id)) {
      this.changedDirctory();
    }
   }

  // er - ar
  changedDirctory(){
    let savedLang = localStorage.getItem('lang') || '';
    this.translate.use(savedLang);
    if (savedLang == 'en') {
      document.documentElement.dir ='ltr';
  }else{
    document.documentElement.dir = 'rtl';
  }
}
}
