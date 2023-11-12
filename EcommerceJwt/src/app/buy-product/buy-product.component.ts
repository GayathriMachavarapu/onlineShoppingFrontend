import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { orderDetails } from '../_model/OrderDetails.model';
import { ProductService } from '../_Services/product.service';
declare var Razorpay: any;


@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit{
   
  isSingleProductCheckout: boolean=false;
   productDetails:Product[]=[];
   oDetails:orderDetails={
   fullName: '',
   fullAddress: '',
   contactNumber: '',
   alternateContactNumber: '',
   orderProductQuantityList: [],
   transactionId:''
 }
 

  constructor(private activated:ActivatedRoute,
    private productService:ProductService,
    private router :Router
    ) {
    
  }
  ngOnInit(): void {
    this.productDetails=this.activated.snapshot.data['productDetails'];

   this.isSingleProductCheckout= (this.activated.snapshot.paramMap.get("isSingleProductCheckout") === 'true');
    this.productDetails.forEach(
       x =>this.oDetails.orderProductQuantityList.push(
        {productId:x.productId,quantity:1}
      )
    )
   console.log(this.oDetails);
    console.log(this.productDetails);

  }
  placeOrder(orderForm:NgForm){
    this.productService.placeOrder(this.oDetails,this.isSingleProductCheckout).subscribe(
      (resp)=>{
        console.log(resp);
        orderForm.reset();
        this.router.navigate(['/orderConfirm']);

      },
      (err)=>{
        console.log(err);
      }
    );

  }

  getQuantityForProduct(productId:number){
    const filteredProduct=this.oDetails.orderProductQuantityList.filter((productQuantity)=>productQuantity.productId===productId);
    return filteredProduct[0].quantity;

  }

  getCalculatedTotal(productId:number,productDiscountedprice:number){
   const filteredProduct= this.oDetails.orderProductQuantityList.filter(
    (productQuantity)=>productQuantity.productId==productId

    );
    return filteredProduct[0].quantity *productDiscountedprice;

  }
  onQuantityChanged(q:number,productId:number){
    this.oDetails.orderProductQuantityList.filter(
 (orderProduct)=>orderProduct.productId===productId
    )[0].quantity=q;

  }

  getClaculatedGrandTotal(){
    let grandTotal=0;
    this.oDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
       const price= this.productDetails.filter(product=> product.productId==productQuantity.productId)[0].productDiscountedprice;
      grandTotal=grandTotal+price*productQuantity.quantity;
      }

    );
    return grandTotal;
  }
  createTransactionAndPlaceOrder(orderForm: NgForm) {
    let amount = this.getClaculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (response) => {
        console.log(response);
        this.openTransactioModal(response, orderForm);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  openTransactioModal(response: any, orderForm: NgForm) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Learn programming yourself',
      description: 'Payment of online shopping',
      image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        if(response!= null && response.razorpay_payment_id != null) {
          this.processResponse(response, orderForm);
        } else {
          alert("Payment failed..")
        }
       
      },
      prefill : {
        name:'LPY',
        email: 'LPY@GMAIL.COM',
        contact: '90909090'
      },
      notes: {
        address: 'Online Shopping'
      },
      theme: {
        color: '#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any, orderForm:NgForm) {
    this.oDetails.transactionId = resp.razorpay_payment_id;
    this.placeOrder(orderForm);
  }
}