import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit,OnChanges{
  @Input('current') currentScore;
  @Input('target') targetScore;
  @Input('total') totalMaxScore;
  FinalCurrentScore: number =0;
  FinaltargetScore: number =0;
  tooltip: boolean;
  diffScore: number;
  bottomTip: boolean;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.renderScores();
    
  }
  _difFinder(currentScore: any, targetScore: any) {
   
    if(currentScore && targetScore){
      this.diffScore =Math.abs(currentScore - targetScore); 
     if(this.diffScore < 10){
       this.bottomTip = true;
     }else{
      this.bottomTip = false;
     }
     this.tooltip = true
    }
  }
  renderScores() {
   if(this.currentScore && this.targetScore){
    this.tooltip = false;
     setTimeout(()=>{    
      this.FinalCurrentScore= Math.round((100 * this.currentScore ) / this.totalMaxScore);
      this.FinaltargetScore= Math.round((100 * this.targetScore ) / this.totalMaxScore) ; 
      setTimeout(()=>{
        this._difFinder(this.FinalCurrentScore,this.FinaltargetScore);
      //  this.tooltip = true
      },500)   
     });
   }
  }
 
}
