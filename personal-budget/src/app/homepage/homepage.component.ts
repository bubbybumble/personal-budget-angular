import {  AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart} from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit{



public datasource: any = {
          
  labels: [],
  datasets: [
      {
          data: [],
          backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#cd56ff', '#6384ff', '#a2eb36', '#56ffcd'],
      },
  ],
};



  constructor(private http: HttpClient){}
  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {

      
      for (var i = 0; i < res.myBudget.length; i++) {
        this.datasource.datasets[0].data[i] = res.myBudget[i].budget;
        this.datasource.labels[i] = res.myBudget[i].title;
      }
    this.createChart();
    })
  }
  createChart(){
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: this.datasource
    });
};
}
