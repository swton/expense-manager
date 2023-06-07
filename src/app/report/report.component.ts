import { Component, OnInit } from '@angular/core';
import { Expense } from '../../model/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { map } from 'rxjs/operators';
import { error } from 'console';

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
  totalIncome: number = 0;
  totalExpense: number = 0;
  netWorth: number = 0;
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
    this.totalIncome = 0;
    this.totalExpense = 0;
    this.netWorth = 0;
    this.expenseService.fetchReport('expense')
    .pipe(
      map((val) => {
        if (isFilterActive) {
          let filteredDataByDate = val.map((el) => {
            el.expense = el.expense.filter((e) => {return e.trxDate >= this.fromDate && e.trxDate <= this.toDate})
            if (el.expense.length > 0)
            return el;
          })
          return filteredDataByDate;
        }
        return val;
      })
    )
    .subscribe(
      (data) =>{
        this.listExpense = data;
      }, (error) => {

      }, () => {
        this.listExpense.forEach((expense) => {
          if (expense != undefined) {
            expense.expense.forEach((e) => {
              this.totalExpense += e.amount;
            });
          }
        });
        this.netWorth -= this.totalExpense;
      }
    );

    this.expenseService.fetchReport('income')
    .pipe(
      map((val) => {
        if (isFilterActive) {
          let filteredDataByDate = val.map((el) => {
            el.expense = el.expense.filter((e) => {return e.trxDate >= this.fromDate && e.trxDate <= this.toDate})
            if (el.expense.length > 0)
            return el;
          })
          return filteredDataByDate;
        }
        return val;
      })
    )
    .subscribe(
      data =>{
        this.listIncome = data;
      }, (error) => {

      }, () => {
        this.listIncome.forEach((income) => {
          if (income != undefined) {
            income.expense.forEach((e) => {
              this.totalIncome += e.amount;
            })
          }
        })
        this.netWorth += this.totalIncome;
      }
    );
  }
}
