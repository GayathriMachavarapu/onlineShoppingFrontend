import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../_Services/image-processing.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';




@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit{
  showLoadMore=false;
  showTable=false;
  pageNumber:number=0;
  productDetails:Product[]=[];
  displayedColumns: string[] = ['Id','Product Name', 'description', 'product Discounted price', 'product Actual Price','Action'];
  constructor(private productService:ProductService,
    public imagesDialog: MatDialog,
    private imageProcessing:ImageProcessingService,
    private router:Router
    ){}
  ngOnInit(): void {
    this.getAllProducts();

  }


public getAllProducts(searchKey:string=""){
  this.showTable=false;
  this.productService.getAllProducts(this.pageNumber,searchKey)
  .pipe(
    map((x:Product[])=>
    x.map((product:Product)=> this.imageProcessing.createImages(product)))
  )
  .subscribe(
    (resp:Product[])=>{
     // console.log(resp);
     if(resp.length==12){
      this.showLoadMore=true;
     }else{
      this.showLoadMore=false;
     }
      
      resp.forEach(p=>this.productDetails.push(p));
      console.log(this.productDetails);
      this.showTable=true;


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
  this.getAllProducts(searchByKeyword);
}



public deleteProductDetails(productId:number){
  this.productService.deleteProductDetails(productId)
  .subscribe(
    (_resps)=>{
      
       this.getAllProducts();
    },
    (error:any)=>{
      console.log(error);
      
    }
  );
  
}



showImages(product:Product){
  console.log(product);
  this.imagesDialog.open(ShowProductImagesDialogComponent,{
    data: {
      images: product.productImages
    },
    height:'500px',
    width:'800px'
  });
}





public editProductDetails(productId:number){
  
  this.router.navigate(['/addNewProduct',{productId:productId}]);
}


loadMore(){
  this.pageNumber=this.pageNumber+1;
  this.getAllProducts();
}
}
