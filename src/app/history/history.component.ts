import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  listTransaction =[];
  fromDate:Date;
  toDate:Date;
  constructor(private expenseService:ExpenseService) { }

  ngOnInit(): void {
    this.listTransaction = this.expenseService.getListTransaction(this.fromDate,this.toDate);
  }

}
