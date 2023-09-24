import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class DataService {
  public datasource: any = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#cd56ff', '#6384ff', '#a2eb36', '#56ffcd'],
      },
    ],
  };

  constructor(private http: HttpClient) { }

  async getData(): Promise<any> {
    if (this.datasource.labels.length <= 0) {
      
      const res: any = await this.http.get('http://localhost:3000/budget').toPromise(); // It says toPromise is deprecated but it is the only thing I found to use for this so far

      for (let i = 0; i < res.myBudget.length; i++) {
        this.datasource.datasets[0].data[i] = res.myBudget[i].budget;
        this.datasource.labels[i] = res.myBudget[i].title;
      }

    }

    return this.datasource;
  }

}
