import { FileHandle } from "./file.handle.model"

export interface Product{
    productId: number,
    productName:string,
    productDescription:string,
    productDiscountedprice:number,
    productActualPrice:number,
    productImages:FileHandle[]
}