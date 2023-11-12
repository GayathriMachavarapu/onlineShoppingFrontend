import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { orderDetails } from '../_model/OrderDetails.model';
import { MyOrderDetails } from '../_model/order.model';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public addProduct(product:FormData){
    return this.http.post<Product>("http://localhost:9090/addNewProduct",product);
  }
  public getAllProducts(pageNumber:number,searchKeyWord:string=""){
    return this.http.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyWord);
  }

  public deleteProductDetails(productId:number){
    return this.http.delete("http://localhost:9090/deleteProductDetails/"+productId);
  }

  public getProductDetailsById(productId:number){
    return this.http.get("http://localhost:9090/getProductDetailsById/"+productId);
  }
  public getProductDetails(isSingleProductCheckout:boolean,productId:number){
    return this.http.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(oDetails:orderDetails,isSingleProductCheckout:boolean){
    return this.http.post("http://localhost:9090/placeOrder/"+isSingleProductCheckout,oDetails);
  }

  public addToCart(productId:number){
    return this.http.get<any>("http://localhost:9090/addToCart/"+productId);
  }

  public getCartDetails(){
    return this.http.get<any[]>("http://localhost:9090/getCartDetails");
  }

  public deleteCartItem(cartId:number){
    return this.http.delete("http://localhost:9090/deleteCartItem/"+cartId);
  }

  public getMyOrders():Observable<MyOrderDetails[]>{
    return this.http.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
  }

  public getAllOrderDetails(status:string):Observable<any[]>{
    return this.http.get<any[]>("http://localhost:9090/getAllOrderDetails/"+status);
    
  }

  public markAsDelivered(orderId:number){
    return this.http.get("http://localhost:9090/markAsDelivered/"+orderId);
  }

  public createTransaction(amount:number){
    return this.http.get("http://localhost:9090/createTransaction/"+amount);
  }

  getUserDetails(): Observable<any> {
    return this.http.get<any>("http://localhost:9090/user/my-profile");
  }

  updateUserProfile(updatedUser: any): Observable<any> {
    return this.http.put<any>("http://localhost:9090/user/update-my-profile", updatedUser);
  }

  
  
}