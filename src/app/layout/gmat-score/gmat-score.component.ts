import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Validation } from '../validation.service';
import * as $ from 'jquery';
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
      current_Q: ['', Validators.compose([Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),Validation.validScore])],
      target_Q: ['', Validators.compose([Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),Validation.validScore])],
      current_V: ['', Validators.compose([Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),Validation.validScore])],
      target_V:['', Validators.compose([Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),Validation.validScore])],
    });
  }
  get fields() {
    return this.gmatForm.controls;
  }
  onSubmit(){
    if (this.gmatForm.valid) {
    //getting field values
    this.fieldValues = {
      "quant_c":+this.fields.current_Q.value, 
      "quant_t":+this.fields.target_Q.value,
      "verbal_c":+this.fields.current_V.value,
      "verbal_t":+this.fields.target_V.value
      }    
   this.calculateScore();
    }else {
      this.validateAllFormFields(this.gmatForm);
    }
  }
  calculateScore() {
    this.CurrentScore = +this.getCurrentScore(this.fieldValues.quant_c,this.fieldValues.verbal_c);
    this.TargetScore = +this.getTargetScore(this.fieldValues.quant_t,this.fieldValues.verbal_t);
    if(this.CurrentScore &&  this.TargetScore){
      let params={ ...this.fieldValues,currentScore:this.CurrentScore,targetScore:this.TargetScore };
      this.renderProgressTemplate(params);//render template
    }
  }
  renderProgressTemplate(params) {
    this.progressBar =  true;
    this.progressBarParams = params;
    this.gmatForm.reset();
    $('html, body').animate({
      'scrollTop' : $("#progressGraph").offset().top 
    });  //scroll to bar on submit
  }
 
  getTargetScore(quant_t: any, verbal_t: any) {
    return 200 + (quant_t + verbal_t) * 5 //target score
  }
  getCurrentScore(quant_c: any, verbal_c: any) {
    return 200 + (quant_c + verbal_c) * 5 //curret score
  }
  validateAllFormFields(formGroup: FormGroup) {
    //check the valid fields
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  validation_messages = {
    //errror messages
    'current_Q': [
      { type: 'required', message: 'Current Score is required' } ,
      { type: 'pattern', message: 'Only Numbers are allowed' },
      { type: 'validScore', message: 'Scores range from 0 – 60' },
    ],
    'target_Q': [
      { type: 'required', message: 'Target Score is required' } ,
      { type: 'pattern', message: 'Only Numbers are allowed' },
      { type: 'validScore', message: 'Scores range from 0 – 60' },
    ],
    'current_V': [
      { type: 'required', message: 'Current Score is required' },
      { type: 'pattern', message: 'Only Numbers are allowed' },
      { type: 'validScore', message: 'Scores range from 0 – 60' }, 
    ],
    'target_V': [
      { type: 'required', message: 'Target Score is required' },
      { type: 'pattern', message: 'Only Numbers are allowed' },
      { type: 'validScore', message: 'Scores range from 0 – 60' }, 
    ]
  };
}
