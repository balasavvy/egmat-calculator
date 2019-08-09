import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit ,OnChanges{
  @Input('progressBarParams') progressBarParams;
  totalScore: number;
  qScore: number;
  vScore: number;
  vScore_t: number;
  qScore_t: number;
  totalScore_t: number;
  totalMaxScore: number;
  quantMaxScore: number;
  verbalMaxScore: number;
  constructor() {
    this.totalMaxScore =800;
    this.quantMaxScore =60;
    this.verbalMaxScore =60;
   }

  ngOnInit() {
    this.init()
  }
  
  ngOnChanges(){
    this.init();
    
  }

  init(){
    if(this.progressBarParams){
      this.totalScore= this.progressBarParams.currentScore;      
      this.qScore= this.progressBarParams.quant_c;
      this.vScore= this.progressBarParams.verbal_c;
      this.qScore_t= this.progressBarParams.quant_t;
      this.vScore_t= this.progressBarParams.verbal_t;
      this.totalScore_t= this.progressBarParams.targetScore;  
    }
  }
}
