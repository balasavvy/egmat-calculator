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
  @Input('flag') flag :string;
  FinalCurrentScore: number =0;
  FinaltargetScore: number =0;
  tooltip: boolean;
  diffScore: number;
  bottomTip: boolean;
  scoreDifference: number;
  message :string ='';
  equal: boolean;
  high: boolean;
  low: boolean;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.renderScores();
    
  }
  _difFinder(currentScore: any, targetScore: any) {   
    if(currentScore && targetScore){
      this.diffScore =Math.abs(currentScore - targetScore); 
     if(this.diffScore < 8){
       this.bottomTip = true;
     }else{
      this.bottomTip = false;
     }
     this.tooltip = true;
     if(currentScore > targetScore){
      this.diffScore =0;
      this.equal=false;
      this.high=true;
      this.low=false;
     }else if(currentScore == targetScore){
      this.equal=true;
      this.high=false;
      this.low=false;
     }else{
      this.equal=false;
      this.high=false;
      this.low=true;
     }
     this.renderMssage()
    }
  }
  renderMssage() {
   let ScoreFlag= this.flag;
   switch(ScoreFlag) { 
    case "totalScore": { 
      let status = this.high?`<b>${this.scoreDifference}  points</b> higher than`:this.low?`<b>${this.scoreDifference}  points</b> lower than`:`<b>equal</b> to`;
      let score= !this.equal?`${this.targetScore}`:'';
      this.message=`Your estimated GMAT score per your performance in this mock test is <b>${this.currentScore}</b>, 
      which is ${status} your target GMAT score ${score}.`; 
       break; 
    } 
    case "quant": { 
      let status = this.high?`<b>${this.scoreDifference}  points</b> higher than`:this.low?`<b>${this.scoreDifference}  points</b> lower than`:`<b>equal</b> to`;
      let score= !this.equal?`Q${this.targetScore}`:'';
      this.message=`Your estimated quantitative score per your performance in this mock test is Q${this.currentScore}, 
      which is ${status} your target quantitative score ${score}. `;
       break; 
    }
    case "verbal": { 
      let status = this.high?`<b>${this.scoreDifference}  points</b> higher than`:this.low?`<b>${this.scoreDifference}  points</b> lower than`:`<b>equal</b> to`;
      let score= !this.equal?`V${this.targetScore}`:'';
      this.message=`Your estimated verbal score per your performance in this mock test is V${this.currentScore}, 
      which is ${status} your target verbal score ${score}. `;
       break;    
    } 
    default: { 
      this.message=''; 
       break;              
    } 
 } 
  }
  renderScores() {
   if(this.currentScore && this.targetScore){
    this.tooltip = false;
    this.scoreDifference= Math.abs(this.currentScore - this.targetScore);
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
