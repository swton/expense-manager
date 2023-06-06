import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/model/expense.model';
import { ExpenseService } from 'src/services/expense.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent implements OnInit {

  updateAddForm: FormGroup;
  listCategory=[];
  expenseType:string;
  expenseDataFromState: Expense;
  isEdit = false;
  expenseCategory;
  constructor(private expenseService:ExpenseService,private router:Router,private route:ActivatedRoute) {
    this.isEdit = this.router.url.includes('edit');
    this.expenseDataFromState = this.router.getCurrentNavigation().extras?.state?.data;
  }

  ngOnInit(): void {
    this.updateAddForm = new FormGroup({
      trxDate: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      desc: new FormControl(null, [Validators.required]),
    });
    this.route.queryParams
      .subscribe(params => {
        this.expenseType = params.type;
      }
    );
    if (this.isEdit) {
      if (this.expenseDataFromState != undefined) {
        this.setDataToEditForm();
      } else {
        this.router.navigate(['record']);
      }
    }
    this.fetchCategory();
  }

  fetchCategory(){
    this.expenseService.getListCategory(this.expenseType).subscribe(
      data =>{
        this.listCategory=  data;
      });
  }

  setDataToEditForm() {
    this.updateAddForm.patchValue({
      trxDate: this.expenseDataFromState.trxDate,
      category: this.expenseDataFromState.category,
      amount: this.expenseDataFromState.amount,
      desc: this.expenseDataFromState.desc,
    });
  }

  onSubmit(){
    let expenseData: Expense = {
      trxDate: this.updateAddForm.value.trxDate,
      category: this.updateAddForm.value.category,
      amount: this.updateAddForm.value.amount,
      desc: this.updateAddForm.value.desc,
      expenseType: this.expenseType,
      isDeleted: 0
    }
    if (!this.isEdit) {
      this.expenseService.createAndPost(expenseData).subscribe((response) => {
        // response data
      }, (error) => {
        // Kondisi Error
      }, () => {
        // setelah berhasil add data baru redirect ke record list
        this.router.navigate(['record']);
      });
    } else {
      expenseData.id = this.expenseDataFromState.id;
      this.expenseService.updateData(expenseData).subscribe((response) => {

      }, (error) => {

      }, () => {
        this.router.navigate(['record']);
      });
    }
  }
  
  back() {
    this.router.navigate(['record']);
  }

  addCategory(){
    this.expenseService.addCategory(this.expenseCategory,this.expenseType).subscribe((response) => {
      // response data
    }, (error) => {
      // Kondisi Error
    }, () => {
      // setelah berhasil 
    });
    this.fetchCategory();
  }
}
