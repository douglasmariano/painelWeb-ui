import { AbstractControl, ValidatorFn } from '@angular/forms';
 
export default class Validation {
    static match(controlName: string, checkControlName: string): ValidatorFn {
      return (controls: AbstractControl) => {
        const control = controls.get(controlName);
        const checkControl = controls.get(checkControlName);      
        //console.log('p '+ control.value, 's '+checkControl.value)  
       // if (checkControl.errors && !checkControl.errors.matching) {
         // return null;
        //}
        if (Number(control.value) > Number(checkControl.value && checkControl.value != '' )) {
          controls.get(checkControlName).setErrors({ matching: true });
          return { matching: true };   
        } else {
          return null;
        }
      };
    }
  }