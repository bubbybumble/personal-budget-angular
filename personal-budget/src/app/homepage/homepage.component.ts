import {  AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart} from 'chart.js/auto';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [DataService]
})
export class HomepageComponent implements AfterViewInit{

  private datasource: any = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#cd56ff', '#6384ff', '#a2eb36', '#56ffcd'],
      },
    ],
  };



  constructor(private dataService:DataService){}
  async ngAfterViewInit(): Promise<void> {
    
    this.datasource = await this.dataService.getData();
    this.createChart();
    
  }

  createChart(){
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: this.datasource
    });
};
}
