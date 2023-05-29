import { Component, OnInit } from '@angular/core';
import { Expense } from '../../model/expense.model';
import { ExpenseService } from '../../services/expense.service';

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

  
  onFetchData(){
    this.expenseService.fetchAll().subscribe(
      data =>{
        this.listTransaction = data;
      }
    );
  }

  filterData(){
    this.onFetchData();
    let tempData = this.listTransaction;
    let filterList:Expense[]=[];
    for(var data of tempData){
      if(data.trxDate > this.fromDate 
      && data.trxDate < this.toDate ){
        filterList.push(data);
      }
    }
    this.listTransaction=filterList;
  }
}
