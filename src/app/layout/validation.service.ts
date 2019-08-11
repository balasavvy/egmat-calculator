import { FormControl } from '@angular/forms';
let _maxScore =60;
let _minScore =1;
export class Validation {
      static validScore(fc1: FormControl){
        let number = +fc1.value;
       if(fc1.value && (number > _maxScore || number < _minScore)){
        return {
            validScore : true
        } 
       }else{
        return null
       }
       
    }

}
