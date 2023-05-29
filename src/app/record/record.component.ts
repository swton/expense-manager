import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense.model';
import { Router,ActivatedRoute } from '@angular/router';

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
  totalExpense:number = 0;
  totalIncome:number = 0;
  error;

  constructor(private expenseService : ExpenseService
    ,private router:Router ,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.onFetchData();
  }

  addExpense(){
    this.router.navigate(['add'],{queryParams:{type:'expense'}, relativeTo:this.route});
  }

  addIncome(){
    this.router.navigate(['add'],{queryParams:{type:'income'}, relativeTo:this.route});
  }

  onFetchData(){
    let userId:string = 'swt';//hardcode userId
    this.expenseService.fetchPosts('expense',userId).subscribe(
      data =>{
        this.listExpense = data;
        this.totalExpense = this.expenseService.getTotalAmount(data);
        
      }
    );

    this.expenseService.fetchPosts('income',userId).subscribe(
      data =>{
        this.listIncome = data;
        this.totalIncome = this.expenseService.getTotalAmount(data);
      }
    );
  }

  deleteData(data:Expense){
    this.expenseService.deleteData(data).subscribe(
      response => {
        console.log(response);
        this.onFetchData();
      }
    );
    
  }

  




}
