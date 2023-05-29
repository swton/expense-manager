import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private listExpense = [];
  private listIncome = [];

  constructor() { }
  
  getListExpense(userId:string){
    this.listExpense = [
    { id: 1
      , category: 'Belanja Harian'
      , amount: 10000
      , desc: 'Jualan Siomay'
      , incomeDate: '2022-11-11' },
    { id: 2
        , category: 'Jajan Harian'
        , amount: 20000
        , desc: 'Jualan Bola'
        , incomeDate: '2022-11-12' },
  ];

  return this.listExpense;
  }

    
  getListIncome(userId:string){
    this.listIncome = [
    { id: 1
      , category: 'Penjualan Harian'
      , amount: 10000
      , desc: 'Jualan Siomay'
      , incomeDate: '2022-11-11' },
    { id: 2
        , category: 'Hasil Harian'
        , amount: 20000
        , desc: 'Jualan Bola'
        , incomeDate: '2022-11-12' },
   ];

    return this.listIncome;
  }

  getTotalExpense(userId:string){
    let totalExpense:number;
    totalExpense = 10;
    return totalExpense;
  }

  getTotalIncome(userId:string){
    let totalIncome:number;
    totalIncome = 99;
    return totalIncome;
  }
 
  getListTransaction(fromDate:Date,toDate:Date){
    let listTransaction = [
      { id: 1
        , category: 'Penjualan Harian'
        , amount: 10000
        , desc: 'Jualan Siomay'
        , incomeDate: '2022-11-11' },
      { id: 2
          , category: 'Hasil Harian'
          , amount: 20000
          , desc: 'Jualan Bola'
          , incomeDate: '2022-11-12' },
     ];
     return listTransaction;
  }

}
