import { AfterViewInit, Component } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss'],
  providers: [DataService]
})
export class D3ChartComponent implements AfterViewInit{

  private datasource: any = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#cd56ff', '#6384ff', '#a2eb36', '#56ffcd'],
      },
    ],
  };

  private data: any = [ // filled with reformatted data from datasource once that's obtained
   
  ];

  private svg: any;
  private margin = 50;
  private width = 512;
  private height = 512;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  constructor(private dataService:DataService){}
  async ngAfterViewInit(): Promise<void> {
    
    this.datasource = await this.dataService.getData();

    for (let i = 0; i < this.datasource.labels.length; i++) {
      let entry = {entry: "", value: 0};
      entry.entry = this.datasource.labels[i];
      entry.value = this.datasource.datasets[0].data[i];
      this.data.push(entry);
    }

    this.createChart();
    
  }
    

  createChart(){
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map((d: any) => d.value.toString()))
    .range(['#ffcd56', '#ff6384', '#36a2eb', '#cd56ff', '#6384ff', '#a2eb36', '#56ffcd']);

    this.svg = d3.select('article figure#doughnut')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
    

    const pie = d3.pie<any>().value((d: any) => Number(d.value));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(70)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");
    
    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);
    
    
    
    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: any)=> d.data.entry)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d)[0] * 1.5 + "," + labelLocation.centroid(d)[1] * 1.5 + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
    

      
    
  };
}
