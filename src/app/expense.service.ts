import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from './expense.model';
import { map, catchError, tap } from 'rxjs/operators'
import { Subject, throwError } from 'rxjs';
import { isDeepStrictEqual } from 'util';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private listExpense = [];
  private listIncome = [];
  private listData:Expense[];

  constructor(private http:HttpClient) { }
 
    endPointURL: string = 'https://db-expense-manager-default-rtdb.asia-southeast1.firebasedatabase.app/';
    postURL: string = this.endPointURL+'expense.json';

    createAndPost(expenseData: Expense) {
      console.log(expenseData.amount);
        this.http.post<{[name : string]:Expense}>(this.postURL, expenseData).subscribe(
            (data) => {
              console.log(data);
            }
          )
    }

    getListCategory(userId:string,categoryType:string){
      //ambil sesuai category expense / income ke DB Category
      let listCategory=['Jajan','Makan','dll'];
      return listCategory;
    }
    

    fetchPosts(expenseType:string,userId:string) {
        return this.http.get<{[key: string]: Expense}>(this.postURL).
        pipe(
          map(
            responseData => {
              const postArray: Expense[] = [];
              for(const key in responseData) {
                if(responseData.hasOwnProperty(key)) {
                  postArray.push({...responseData[key], id: key})
                }
              }
              let returnList:Expense[] = [];
              for(var data of postArray){
                if(data.expenseType===expenseType && data.createdBy===userId && data.isDeleted===0){
                  returnList.push(data);
                }
              }
              return returnList;
            }
          )
        )
    }

    getTotalAmount(listExpense:Expense[]){
      let total:number=0;
      for(var expense of listExpense){
        total+=expense.amount;
      }
      return total;
    }

    deleteData(data: Expense){
        const dataUpdate = { [data.id] : {
            amount: data.amount,
            category: data.category,
            createdBy: data.createdBy,
            desc: data.desc,
            expenseType: data.expenseType,
            isDeleted: 1,
            trxDate: data.trxDate
        }};
        return this.http.patch(this.postURL, dataUpdate);
    }

    
    fetchAll(userId:string) {
      return this.http.get<{[key: string]: Expense}>(this.postURL).
      pipe(
        map(
          responseData => {
            const postArray: Expense[] = [];
            for(const key in responseData) {
              if(responseData.hasOwnProperty(key)) {
                postArray.push({...responseData[key], id: key})
              }
            }
            let returnList:Expense[] = [];
            for(var data of postArray){
              if(data.createdBy===userId && data.isDeleted===0){
                returnList.push(data);
              }
            }
            return returnList;
          }
        )
      )
  }

  
  fetchReport(userId:string,expenseType:string) {
    return this.http.get<{[key: string]: Expense}>(this.postURL).
    pipe(
      map(
        responseData => {
          const postArray: Expense[] = [];
          for(const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key], id: key})
            }
          }
          let listExpense:Expense[]=[];
          let listofCategory:string[]=[];
          let listExpenseSorted:{category:string,expense:Expense[]}[]=[];
          for(var data of postArray){
            if(data.expenseType===expenseType && data.createdBy===userId && data.isDeleted===0){
              listExpense.push(data);
              listofCategory.push(data.category);
            }
          }
          console.log(listofCategory);
          const distinctArray = listofCategory.filter((n, i) => listofCategory.indexOf(n) === i);

          for(var category of distinctArray){
            let expense:Expense[]=[];
            for(var data of listExpense){
              if(data.category===category){
                expense.push(data);
              }
            }
            listExpenseSorted.push({category,expense})
          }

          return listExpenseSorted;
        }
      )
    )
}

}
