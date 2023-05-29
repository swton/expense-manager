export interface Expense {
    id?: string,
    category: string,
    amount: number,
    desc:string,
    trxDate:Date,
    isDeleted?:number,
    expenseType?:string,
    createdBy?:string
}