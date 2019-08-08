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
  fieldValues: { "quant_c": any; "quant_t": any; "verbal_c": any; "verbal_t": any; };
  CurrentScore: number;
  TargetScore: number;
  progressBar: boolean = false;
  progressBarParams: any;
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
    this.fieldValues = {
      "quant_c":+this.fields.current_Q.value, 
      "quant_t":+this.fields.target_Q.value,
      "verbal_c":+this.fields.current_V.value,
      "verbal_t":+this.fields.target_V.value
      }    
   this.calculateScore(this.fieldValues)   

    }else {
      this.validateAllFormFields(this.gmatForm);
    }
  }
  calculateScore(fieldValues) {
    this.CurrentScore = +this.getCurrentScore(this.fieldValues.quant_c,this.fieldValues.verbal_c);
    this.TargetScore = +this.getTargetScore(this.fieldValues.quant_t,this.fieldValues.verbal_t);
    if(this.CurrentScore &&  this.TargetScore){
      let params={ ...this.fieldValues,currentScore:this.CurrentScore,targetScore:this.TargetScore };
      this.renderProgressTemplate(params)
    }
  }
  renderProgressTemplate(params) {
    this.progressBar =  true;
    this.progressBarParams = params;
    this.gmatForm.reset();
  }
 
  getTargetScore(quant_t: any, verbal_t: any) {
    return 200 + (quant_t + verbal_t) * 5
  }
  getCurrentScore(quant_c: any, verbal_c: any) {
    return 200 + (quant_c + verbal_c) * 5
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
