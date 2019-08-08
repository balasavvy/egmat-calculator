import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Validation } from '../validation.service';

@Component({
  selector: 'app-gmat-score',
  templateUrl: './gmat-score.component.html',
  styleUrls: ['./gmat-score.component.css']
})
export class GmatScoreComponent implements OnInit {
  gmatForm: FormGroup;
  fieldValues: { "quant_c": any; "quant_v": any; "target_c": any; "target_v": any; };
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.gmatForm = this.formBuilder.group({
      current_Q: ['', Validators.compose([Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),Validation.MaxNumber])],
      target_Q: ['', Validators.compose([Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),Validation.MaxNumber])],
      current_V: ['', Validators.compose([Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),Validation.MaxNumber])],
      target_V:['', Validators.compose([Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),Validation.MaxNumber])],
    });
  }
  get fields() {
    return this.gmatForm.controls;
  }
  onSubmit(){
    if (this.gmatForm.valid) {
    alert("success");
    this.fieldValues = {
      "quant_c":this.fields.current_Q.value, 
      "quant_v":this.fields.target_Q.value,
      "target_c":this.fields.target_Q.value,
      "target_v":this.fields.target_Q.value
      }
    console.log(this.fieldValues)
    }else {
      this.validateAllFormFields(this.gmatForm);
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  validation_messages = {
    'current_Q': [
      { type: 'required', message: 'Current Field is required' } ,
      { type: 'pattern', message: 'Only Numbers are allowed' },
      { type: 'MaxNumber', message: 'Score Must not exceed 60.' },
    ],
    'target_Q': [
      { type: 'required', message: 'Target Field is required' } ,
      { type: 'pattern', message: 'Only Numbers are allowed' },
      { type: 'MaxNumber', message: 'Score Must not exceed 60.' },
    ],
    'current_V': [
      { type: 'required', message: 'Current Field is required' },
      { type: 'pattern', message: 'Only Numbers are allowed' },
      { type: 'MaxNumber', message: 'Score Must not exceed 60.' }, 
    ],
    'target_V': [
      { type: 'required', message: 'Target Field is required' },
      { type: 'pattern', message: 'Only Numbers are allowed' },
      { type: 'MaxNumber', message: 'Score Must not exceed 60.' }, 
    ]
  };
}
