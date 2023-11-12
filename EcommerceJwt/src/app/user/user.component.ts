import { Component, OnInit } from '@angular/core';
import { JwtserviceService } from '../_Services/jwtservice.service';
import { response } from 'express';

import { ProductService } from '../_Services/product.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  message!: string;
  userName: string = '';
  users!:string

  constructor(
    private jwtService:JwtserviceService,
   
    private productService:ProductService
  ){}
  ngOnInit(): void {
    this.forUser();
   
    
   
  }
  forUser(){
    this.jwtService.forUser().subscribe(
      (response:any)=>{
         console.log(response);
         this.message=response;
      },
      (error:any)=>{
      console.log(error);

      }
      
    );
  }

  public getUserName(){
    this.productService.getUserDetails().subscribe(
      (response)=>{
         console.log("userName:"+ response.userName);
         this.userName=response.userName;
       
        
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  
}
 
