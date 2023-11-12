import { orderQuantity } from "./OrderQuantity.model";

export interface orderDetails{
    fullName:string,
    fullAddress:string,
    contactNumber:string,
    alternateContactNumber:string,
    orderProductQuantityList:orderQuantity[],
    transactionId:any
}