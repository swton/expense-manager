import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../model/expense.model';
import { map, catchError, tap } from 'rxjs/operators'
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { isDeepStrictEqual } from 'util';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { User } from 'src/model/Model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private listExpense = [];
  private listIncome = [];
  private listData:Expense[];

  constructor(private http:HttpClient, private authService: AuthService) { }
    userSubject = new BehaviorSubject<User>(null); 
    endPointURL: string = environment.apiUrl;
    postURL: string = this.endPointURL+'expense.json';
    postCatURL: string = this.endPointURL+'cat.json';

    createAndPost(expenseData: Expense) {
      expenseData.createdBy = this.authService.userSubject.getValue().id;
      return this.http.post<{[name : string]:Expense}>(this.postURL, expenseData);
    }


    updateData(data: Expense) {
      const dataUpdate = { [data.id] : {
        amount: data.amount,
        category: data.category,
        createdBy: this.authService.userSubject.getValue().id,
        desc: data.desc,
        expenseType: data.expenseType,
        isDeleted: 0,
        trxDate: data.trxDate
    }};
    return this.http.patch(this.postURL, dataUpdate);
    }

    addCategory(expenseCategory: string,expenseType:string) {
      return this.http.post(this.postCatURL, {category:expenseCategory
        ,createdBy: this.authService.userSubject.getValue().id
       ,expenseType:expenseType});
    }

    getListCategory(expenseType:string) {
      return this.http.get(this.postCatURL).
      pipe(
        map(
          responseData => {
            const postArray: {category:string,createdBy:string,expenseType:string}[] = [];
            console.log(responseData);
            for(const key in responseData) {
              if(responseData.hasOwnProperty(key)) {
                postArray.push({...responseData[key], id: key})
              }
            }
            let returnList:string[] = [];
            for(var data of postArray){
              if(data.createdBy===this.authService.userSubject.getValue().id && data.expenseType===expenseType){
                returnList.push(data.category);
              }
            }
            console.log(returnList);
            return returnList;
          }
        )
      )
  }

    // getListCategory(userId:string,categoryType:string){
    //   //ambil sesuai category expense / income ke DB Category
    //   let listCategory=['Jajan','Makan','dll'];
    //   return listCategory;
    // }
    

    fetchPosts(expenseType:string) {
        return this.http.get<{[key: string]: Expense}>(this.postURL, {params: new HttpParams().set('auth', 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkM2E0YTllYjY0OTk0YzUxM2YyYzhlMGMwMTY1MzEzN2U5NTg3Y2EiLCJ0eXAiOiJKV1QifQ')}).
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
                if(data.expenseType===expenseType && data.createdBy===this.authService.userSubject.getValue().id && data.isDeleted===0){
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

    
    fetchAll() {
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
              if(data.createdBy===this.authService.userSubject.getValue().id && data.isDeleted===0){
                returnList.push(data);
              }
            }
            return returnList;
          }
        )
      )
  }

  
  fetchReport(expenseType:string) {
    let userId = this.authService.userSubject.getValue().id;
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
