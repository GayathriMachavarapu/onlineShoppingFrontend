import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { User } from '../_model/user.model';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  updatedUser: User = {
    firstName: '',
    lastName: '',
    role: [],
    userName: '',
    userPassword: ''
  };

  username="";

  constructor(private service:ProductService){}
  ngOnInit(): void {
    this.profile();
    
    
 
  }

  profile(){
    this.service.getUserDetails().subscribe(
      (response:any)=>{
        console.log(response);
        this.username=response.userName;
      },
      (error)=>{
        console.log(error);
      }
    );
  }


  updateUserProfile(updateForm:NgForm){
    console.log('Updated User:', this.updatedUser);
    this.service.updateUserProfile(this.updatedUser).subscribe(
      (response:any)=>{
        console.log(response.userName);
        updateForm.reset();
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
