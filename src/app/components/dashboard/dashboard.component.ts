import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  records: [];

  constructor(){
    this.records = data;
  }

  deleteRecord(id: number) {
    // Remove the record with the given id from the 'records' array
    this.records = this.records.filter(record => record.id !== id);
  }

  sortBy(column: string) {
    // Implement your sorting logic here
    console.log("hi");
  }
}
