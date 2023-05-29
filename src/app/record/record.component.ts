import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../model/expense.model';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'
            ,'/node_modules/bootstrap/dist/css/bootstrap.min.css'],
  encapsulation:ViewEncapsulation.None
})
export class RecordComponent implements OnInit, AfterViewInit {
  listExpense=[];
  listIncome =[];
  totalExpense:number = 0;
  totalIncome:number = 0;
  error;

  constructor(private expenseService : ExpenseService
    ,private router:Router ,private route:ActivatedRoute){}

  ngOnInit(): void {
    // this.onFetchData();
  }

  ngAfterViewInit(): void {
    this.onFetchData();
  }

  addExpense(){
    this.router.navigate(['add'],{queryParams:{type:'expense'}, relativeTo:this.route});
  }

  addIncome(){
    this.router.navigate(['add'],{queryParams:{type:'income'}, relativeTo:this.route});
  }

  onFetchData(){
    this.expenseService.fetchPosts('expense').subscribe(
      data =>{
        this.listExpense = data;
        this.totalExpense = this.expenseService.getTotalAmount(data);
      }
    );

    this.expenseService.fetchPosts('income').subscribe(
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
