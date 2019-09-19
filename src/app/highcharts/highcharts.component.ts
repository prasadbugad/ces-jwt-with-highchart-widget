import { Component, OnInit,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild } from '@angular/core';

import { HighchartsService } from '../_services/highcharts-service';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements AfterViewInit, OnInit {  
  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef) { 
    
  }
  @ViewChild('charts', {static: false}) public chartEl: ElementRef;
  showMsg: boolean;
  ngOnInit(){
    
  }
  ngAfterViewInit() {

    console.log("viewinit");
    this.hcs.loadStateCharts(this.chartEl.nativeElement);
    
  }
 
  createChart() {
    this.hcs.createChart(this.chartEl.nativeElement);
  }

  saveState() {
    this.showMsg = true;
    this.hcs.saveStateCharts();
  }

  hideme(){
    console.log(111);
    this.showMsg = false;
  }
  loadCharts() {
    this.hcs.loadStateCharts(this.chartEl.nativeElement);
  }

  rmFirst() {
    this.hcs.removeFirst();
    this.changeDetectionRef.detectChanges();
    let html = <HTMLElement> document.getElementById("test").firstChild;
    if (!!document.getElementById("test").firstChild) html.outerHTML = '';
    console.log('rm first', this.hcs.getCharts());
  }
}
