import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitString'
})
export class splitString implements PipeTransform {
transform(value:string, [separator]):string {
    let reg = new RegExp (separator);
    let splits = value.split(separator);
    if(splits.length > 1) {
   // FOR LOOP - Check index [0],[1].. are not empty. If value is Empty then Don't return.
        for( let i=0; i<splits.length;i++){ 
            if(splits[i].length > 0){
                return splits[i];
            }
        }
    } else {
      return '';
    }
  }
}