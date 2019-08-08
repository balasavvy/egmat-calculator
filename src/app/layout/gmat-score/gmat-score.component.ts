import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-gmat-score',
  templateUrl: './gmat-score.component.html',
  styleUrls: ['./gmat-score.component.css']
})
export class GmatScoreComponent implements OnInit {
  gmatForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.gmatForm = this.formBuilder.group({
      uName: [null],
      uName1: [null],
      uName2: [null],
      uName3: [null]
    });
  }

}
