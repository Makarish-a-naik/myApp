import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {
  @Input()
  minute: any;
  second;
  circle: SVGCircleElement;
  radius: any;
  circumference: number;


  @Input() set seconds(val) {
    this.second = val;
    this.setProgress(val);
  };

  constructor() { }

  ngOnInit() {
    this.circle = document.querySelector('circle');
    this.radius = this.circle.r.baseVal.value;
    this.circumference = this.radius * 2 * Math.PI;
    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.style.strokeDashoffset = `${this.circumference}`;
    this.setProgress(60);

  }
  setProgress = (percent) => {
    if(this.circle){

      const offset = this.circumference - percent / 60 * this.circumference;
      this.circle.style.strokeDashoffset = '' + offset;
    }
  };

}
