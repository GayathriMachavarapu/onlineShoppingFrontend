import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveData, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_model/product.model';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>
{
 // let isSingleProductCheckout = false;
  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService) { 

    }

  resolve(route: ActivatedRouteSnapshot):  Observable<Product[]>  {
    // const id = route.paramMap.get('id');
     

    // const isSingleProductCheckout = route.paramMap.get('isSingleProductCheckout');

    // // Convert isSingleProductCheckout to a boolean, assuming it can be null or a string
  
    const pd: string | null = route.paramMap.get('productId');
    const isSingleProduct: string | null = route.paramMap.get('isSingleProductCheckout');
    const isSingleProductCheckout = isSingleProduct === 'true';
    // Convert id to number or set it to null if it's not a valid number
    const id: number | null = pd !== null ? parseInt(pd, 10) : null;

    if (id !== null && !isNaN(id)) {
    return this.productService.getProductDetails(isSingleProductCheckout,id).pipe(
      map((products: Product[]) => {
        // Apply image processing to each product
        return products.map((product: Product) => this.imageProcessingService.createImages(product));
      })
      
    );
    
  } 
  else {
    // Handle the case where id is not a valid number or is null
    // For example, redirect to an error page or handle it according to your use case
    // You can also return an empty array or an observable with an empty array depending on your requirements
    return of([] as Product[]);
  }
 
  }
}

