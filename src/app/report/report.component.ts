import { Component, OnInit } from '@angular/core';
import { Expense } from '../../model/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  listExpense:{category:string,expense:Expense[]}[]=[];
  listIncome:{category:string,expense:Expense[]}[]=[];
  fromDate:Date = new Date();
  toDate:Date = new Date();
  constructor(private expenseService:ExpenseService) { }

  ngOnInit(): void {
    this.onFetchData();
  }

  getDatePickerVal(event) {
    this.fromDate = event.dateFrom;
    this.toDate = event.dateTo;

    this.onFetchData(true);
  }

  onFetchData(isFilterActive: boolean = false){
    console.log('masuk');
    
    this.expenseService.fetchReport('expense')
    .pipe(
      map((val) => {
        // if (isFilterActive) {
        //   let filteredDataByDate = val.filter(vl => vl.expense.filter(v => v.trxDate >= this.fromDate && v.trxDate <= this.toDate));
        //   return filteredDataByDate;
        // }
        return val;
      })
    )
    .subscribe(
      (data) =>{
        this.listExpense = data;
      }
    );

    this.expenseService.fetchReport('income')
    .pipe(
      map((val) => {
        // if (isFilterActive) {
        //   let filteredDataByDate = val.filter(vl => vl.expense.filter(v => v.trxDate >= this.fromDate && v.trxDate <= this.toDate));
        //   return filteredDataByDate;
        // }
        return val;
      })
    )
    .subscribe(
      data =>{
        this.listIncome = data;
      }
    );
  }
}
