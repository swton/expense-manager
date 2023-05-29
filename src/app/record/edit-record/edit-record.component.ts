import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/model/expense.model';
import { ExpenseService } from 'src/services/expense.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent implements OnInit {
  @ViewChild('expenseForm') expenseForm: NgForm;
  listCategory=[];
  expenseType:string;
  constructor(private expenseService:ExpenseService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.expenseType = params.type;
      }
    );
    this.listCategory= this.expenseService.getListCategory('userId',this.expenseType);
  }

  onSubmit(expenseForm :Expense){
    expenseForm.expenseType = this.expenseType;
    expenseForm.isDeleted = 0;
    this.expenseService.createAndPost(expenseForm).subscribe((response) => {
      // response data
    }, (error) => {
      // Kondisi Error
    }, () => {
      // setelah berhasil add data baru redirect ke record list
      this.router.navigate(['record']);
    });
  }
  
  back(){
    this.router.navigate(['record']);
  }
}
