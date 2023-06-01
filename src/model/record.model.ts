export interface Records {
    id?:string,
    expenseDate:Date,
    category:string,
    desc:string,
    isDeleted?:number,
    createdBy?:string,
    expenseType?:string
}