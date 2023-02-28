import { LoginService } from './../services/login.service';
import { Directive, Input, TemplateRef,ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRoles]',
})
export class RolesDirective {

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private loginService: LoginService) { 

    }

    @Input() set appRoles(allowedRoles: Array<string>) {
      let shouldShow: boolean = false;
      let loginRoles:Array<string> = this.loginService.getRoles();     
      for(let role of loginRoles){
        console.log(loginRoles)
        if(role.toUpperCase() == "ROLE_TI"){
          shouldShow = true;          
          break;
        }
        for(let allowedRole of allowedRoles){
          allowedRole = allowedRole.toUpperCase();
          if(allowedRole.toUpperCase() == role.toUpperCase()){
            shouldShow = true;            
            break;
          }
        }
      }
      if (shouldShow) {
        this._viewContainer.createEmbeddedView(this._templateRef);
      } else {
        this._viewContainer.clear();
      }
    }
}
