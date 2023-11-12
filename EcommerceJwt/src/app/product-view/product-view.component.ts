import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit{
  product!:Product ;
  selectedProductIndex=0;
  constructor(private activated:ActivatedRoute,
    private router:Router,
    private productService:ProductService
    ){}
  ngOnInit(): void {
    this.product=this.activated.snapshot.data['p'];
    console.log(this.product);
    
  }

  changeIndex(index:number){
    this.selectedProductIndex=index;
  }

  buyProduct(productId:number){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:true,productId:productId
    }]);

  }

  addToCart(productId:number){
    this.productService.addToCart(productId).subscribe(
      (response: any)=>{
        console.log(response);
      },
    (error:any)=>{
      console.log(error);
    }
    );

  }
}
