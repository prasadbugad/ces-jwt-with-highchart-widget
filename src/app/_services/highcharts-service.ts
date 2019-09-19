import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
  
@Injectable()
export class HighchartsService {

  charts = [];
  defaultOptions = {
    chart: {
        type: 'scatter',
        margin: [70, 50, 60, 80],
        events: {
            click: function (e) {
                // find the clicked values and the series
                let x = Math.round(e.xAxis[0].value),
                    y = Math.round(e.yAxis[0].value),
                    series = this.series[0];
                // Add it
                series.addPoint([x, y]);
            }
        }
    },
    title: {
        text: 'User supplied data'
    },
    subtitle: {
        text: 'Click the plot area to add a point. Click a point to remove it.'
    },
    xAxis: {
        gridLineWidth: 1,
        minPadding: 0.2,
        maxPadding: 0.2,
        maxZoom: 60,
    },
    yAxis: {
        title: {
            text: 'Value'
        },
        minPadding: 0.2,
        maxPadding: 0.2,
        maxZoom: 60,
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    legend: {
        enabled: false
    },
    exporting: {
      enabled: false  
    },
    plotOptions: {
        series: {
            lineWidth: 1,
            point: {
                events: {
                    click: function () {
                        if (this.series.data.length > 1) {
                            this.remove();
                        }
                    }
                }
            }
        }
    },
    series: [{
        data: [[20, 20], [80, 80]]
    }]
  }

  constructor() {
  }
  opts: {
    chart: any
  };
  allCharts:any;
  savedSeries:any = [];
  loggedUser: any = JSON.parse(localStorage.getItem('currentUser'));
    createChart(container) {
    
        if(this.opts != null) {
        this.defaultOptions.series = [];
        let dummy = {
            data: [[20, 20], [80, 80]]
        }
        this.defaultOptions.series.push(dummy);      
        }
        this.opts = this.defaultOptions;
        let e = document.createElement("div");
        e.className = "col-md-6";
        
        container.appendChild(e);
        
        if(this.opts.chart != null) {
        this.opts.chart['renderTo'] = e;
        }
        else {
        this.opts.chart = {
            'renderTo': e
        }
        }
        this.charts.push(new Highcharts.Chart(this.opts));
    
    }

    saveStateCharts() {
        this.allCharts = [];
        // let chartData = {
        //     id: this.loggedUser.id,
        //     data: []
        // }
        // this.allCharts.push(chartData);
        // console.log(this.allCharts[0].data);
        let getState = JSON.parse(localStorage.getItem('userState'));
        if(getState){
            this.allCharts = getState;
            var flag = false;
            getState.forEach((elm, index) => {
                if(this.loggedUser.id == elm.id){
                    flag = true;
                    this.allCharts[index].data = [];
                    this.charts.forEach((element, i) => {
                        //if (elm.data.length <= i) {
                            
                            this.allCharts[index].data.push(element.series[0].options.data);
                        //}
                    });
                } else {
                    
                    
                }
            }); 
            if (!flag) {
                let chartData = {
                    id: this.loggedUser.id,
                    data: []
                }
                this.allCharts.push(chartData);
                this.allCharts.forEach((e, j) => {
                    if (this.loggedUser.id == e.id) {
                        this.charts.forEach((element, i) => {
                            this.allCharts[j].data.push(element.series[0].options.data);            
                        });
                    }
                });
            }
        } else {
            let chartData = {
                id: this.loggedUser.id,
                data: []
            }
            this.allCharts.push(chartData);
            this.charts.forEach((element, i) => {
                this.allCharts[length].data.push(element.series[0].options.data);            
            });
        }
        
        localStorage.setItem('userState', JSON.stringify(this.allCharts));
        //this.charts = [];
    }

    loadStateCharts(container) {
        this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
        if(localStorage.getItem('userState') != null ){
            let getState = JSON.parse(localStorage.getItem('userState'));
            getState.forEach(element => {
                console.log(this.loggedUser.id == element.id);
                if(this.loggedUser.id == element.id){
                    element.data.forEach(ele => {
                        this.savedSeries = ele;
                        this.loadSavedChart(container);
                    });
                }
            });
        }
    }

    loadSavedChart(container){
        this.defaultOptions.series = [];
        let dummy = {
            data: this.savedSeries
        }
        this.defaultOptions.series.push(dummy);      
      
      this.opts = this.defaultOptions;
      let e = document.createElement("div");
      e.className = "col-md-6";
      
      container.appendChild(e);
      
      if(this.opts.chart != null) {
        this.opts.chart['renderTo'] = e;
      }
      else {
        this.opts.chart = {
          'renderTo': e
        }
      }
      this.charts.push(new Highcharts.Chart(this.opts));
    }
  
  
  removeFirst() {
    this.charts.shift();
  }
  
  
  getChartInstances(): number {
    return this.charts.length;
  }

  getCharts() {
    return this.charts;
  }

  clearChartData() {
    this.charts = [];
  }
}
