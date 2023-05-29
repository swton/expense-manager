import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'
            ,'/node_modules/bootstrap/dist/css/bootstrap.min.css'],
  encapsulation:ViewEncapsulation.None
})
export class RecordComponent implements OnInit {
  listExpense=[];
  listIncome =[];
  totalExpense:number;
  totalIncome:number;
  constructor(private expenseService : ExpenseService) { }

  ngOnInit(): void {
    this.listExpense = this.expenseService.getListExpense('userId');
    this.listIncome = this.expenseService.getListIncome('userId');
    this.totalExpense = this.expenseService.getTotalExpense('userId');
    this.totalIncome = this.expenseService.getTotalIncome('userId');

  }

}
