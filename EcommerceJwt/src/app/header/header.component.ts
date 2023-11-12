import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_Services/user-auth.service';
import { Router } from '@angular/router';
import { JwtserviceService } from '../_Services/jwtservice.service';
import { ProductService } from '../_Services/product.service';

import { response } from 'express';
import { User } from '../_model/user.model';

import { UserComponent } from '../user/user.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username!: string;


  constructor(
    private userAuthService:UserAuthService,
    private router:Router,
    public service:JwtserviceService,
    public productService:ProductService,

    private userComponent:UserComponent
  ){}
  ngOnInit(): void {
   
  }
  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
    
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public isAdmin(){
    return this.userAuthService.isAdmin();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }

  


  


}
