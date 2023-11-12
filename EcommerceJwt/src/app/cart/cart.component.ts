import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private productService:ProductService,private router:Router){}
  cartDetails:any[]=[];

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'DiscountedPrice','Action'];

  ngOnInit(): void {
    this.getCartDetails();
    
  }

  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (response:any[])=>{
        console.log(response);
        this.cartDetails=response
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  checkOut(){
  //   this.productService.getProductDetails(false,0).subscribe(
  //     (response)=>{
  //       console.log(response);
  //     },
  //     (error)=>{
  //     console.log(error);
  //     }
      
  //   );
  this.router.navigate(['/buyProduct',{
    isSingleProductCheckout:false,productId:0
  }]);
   }

   delete(cartId:number){
   this.productService.deleteCartItem(cartId).subscribe(
    (response)=>{
      console.log(response);
      this.getCartDetails();
    },
    (error)=>{
      console.log(error);

    }
    );

   }
}
