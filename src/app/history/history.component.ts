import { Component, OnInit } from '@angular/core';
import { Expense } from '../../model/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  listTransaction:Expense[] =[];
  fromDate:Date = new Date();
  toDate:Date = new Date();
  userId:string;
  constructor(private expenseService:ExpenseService) { }

  ngOnInit(): void {
    this.onFetchData();
  }

  getDatePickerVal(event) {
    this.fromDate = event.dateFrom;
    this.toDate = event.dateTo;

    this.onFetchData(true);
  }
  
  onFetchData(isFilterActive: boolean = false) {
    this.expenseService.fetchAll()
    .pipe(
      //Map data if filter active
      map((val) => {
        if (isFilterActive) {
          let filteredDataByDate = val.filter(v => v.trxDate >= this.fromDate && v.trxDate <= this.toDate);
          return filteredDataByDate;
        }
        return val;
      })
    )
    .subscribe(
      data =>{
        this.listTransaction = data;
      }
    );
  }
}
