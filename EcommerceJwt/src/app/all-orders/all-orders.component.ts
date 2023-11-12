import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { response } from 'express';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit{
 
  displayedColumns: string[] = ['Id','Product Name','Name', 'Address', 'Contact:No', 'Amount','Status','Action'];
  dataSource :any[]= []
  status:string="All"
  constructor(private productService:ProductService){

  }
  ngOnInit(): void {
    this.getAllOrderDetails(this.status);
    
  }

  getAllOrderDetails(status:string){
    this.productService.getAllOrderDetails(status).subscribe(

      (response:any[])=>{
        console.log(response);
        this.dataSource=response
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId:any){
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
    (response)=>{
      console.log(response);
      this.getAllOrderDetails(this.status);
    },
    (error)=>{
      console.log(error);
    }
    );

  }

}
