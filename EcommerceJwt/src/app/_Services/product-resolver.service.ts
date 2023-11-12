import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';


import { ProductService } from './product.service';

import { Observable } from 'rxjs/internal/Observable';

import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';
import {  ActivatedRouteSnapshot, Resolve, ResolveFn } from '@angular/router';
import { ImageProcessingService } from './image-processing.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';



@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {
  constructor(
    private productService: ProductService,
     private imageProcessing: ImageProcessingService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const id = route.paramMap.get('productId');

  if(id){
    // Fetch details from backend
    // return this.productService.getProductDetailsById(+id).pipe(
    //   map((product:any)=> this.imageProcessing.createImages(product))
    // );
    return this.productService.getProductDetailsById(+id).pipe(
      switchMap((p:any) => of(this.imageProcessing.createImages(p)))
    );
    
    }else  {
     // If id is null, return a default product or handle this case as appropriate
      return of(this.getProductDetails());
  }  
}

getProductDetails() {
  return {
    productId: 0,
    productName: '',
    productDescription: '',
    productDiscountedprice: 0,
    productActualPrice: 0,
    productImages: []
  };
  }
}