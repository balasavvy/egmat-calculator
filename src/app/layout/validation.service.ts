import { FormControl } from '@angular/forms';
let _maxScore =60;
export class Validation {
      static MaxNumber(fc1: FormControl){
        let number = +fc1.value;
       if(number > _maxScore){
        return {
            MaxNumber : true
        } 
       }else{
        return null
       }
       
    }

}
