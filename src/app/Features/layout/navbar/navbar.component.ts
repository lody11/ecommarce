import { Component, computed, effect, Input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MyTranslateService } from '../../../core/services/myTranslate/my-translate.service';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Input() showlinks: boolean = true;

  cartNumber!:Signal<number>;

  isLogin: boolean = false;

  isActive : boolean = false;
  

  constructor(public _AuthService: AuthService, private flowbiteService: FlowbiteService, private myTranslate:MyTranslateService, private cart:CartService) {


    effect(()=>{
      this.cartNumber = computed(()=>this.cart.cartNumber())
      if (_AuthService.userData() !== null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    })

    
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite =>{
      console.log('Flowbite loaded', flowbite);
    });
  }

  changeLang(lang:string){
    localStorage.setItem('lang',lang);
    this.myTranslate.changedDirctory();
    if (lang == 'ar') {
      this.isActive = true;
    }else {
      this.isActive = false;
    }
  }
}
