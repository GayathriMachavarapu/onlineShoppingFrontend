import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs/internal/operators/map';
import { ImageProcessingService } from '../_Services/image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuthService } from '../_Services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  pageNumber:number=0;
  productDetails:any=[];


  showLoadButton=false;
  constructor(private userAuthService:UserAuthService,
    private productService:ProductService,
    private imageProcessing:ImageProcessingService,
    private router:Router
    ){}
  ngOnInit(): void {
    this.getAllProducts();
  }

public getAllProducts(searchKey:string=""){
  this.productService.getAllProducts(this.pageNumber,searchKey)
  .pipe(
    map((x:Product[])=>
    x.map((product:Product)=> this.imageProcessing.createImages(product)))
  )
  .subscribe(
    (resp:Product[])=>{
      console.log(resp);
      if(resp.length==12){
        this.showLoadButton=true;
      }else{
        this.showLoadButton=false;
      }
      resp.forEach(p=>this.productDetails.push(p));
      //this.productDetails=resp;
},
(error:HttpErrorResponse)=>{
  console.log(error);
}
);

}
searchByKeyword(searchByKeyword:any){
  console.log(searchByKeyword);
  this.pageNumber=0;
  this.productDetails=[];
  this.getAllProducts(searchByKeyword)
}

public showProductDetails(productId:number){
this.router.navigate(['/productViewDetails',{productId:productId}]);

}

public loadMore(){
  this.pageNumber=this.pageNumber+1;
  this.getAllProducts();


}

public isLoggedIn(){
  return this.userAuthService.isLoggedIn();
}



}
