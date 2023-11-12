import { Component, OnInit } from '@angular/core';

import { User } from '../_model/user.model';
import { response } from 'express';
import { MatTableDataSource } from '@angular/material/table';
import { MyOrderDetails } from '../_model/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtserviceService } from '../_Services/jwtservice.service';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user: User={
    firstName: '',
    lastName: '',
    role: [],
    userName: '',
    userPassword: ''
  }

  
  

  
  constructor(private route: ActivatedRoute,private service:ProductService,private router:Router){

  }
  ngOnInit(): void {
    this.profile();
    
  }
  profile(){
    this.service.getUserDetails().subscribe(
      (response:any)=>{
        console.log(response);
        this.user=response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  updateProfile(){
    this.router.navigate(['/updateProfile']);
    
  }

  
  
  
}
