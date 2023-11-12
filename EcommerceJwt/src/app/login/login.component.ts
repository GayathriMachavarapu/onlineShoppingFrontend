import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserAuthService } from '../_Services/user-auth.service';
import { Router } from '@angular/router';
import { JwtserviceService } from '../_Services/jwtservice.service';
import { catchError, throwError } from 'rxjs';
import { ProductService } from '../_Services/product.service';
import { response } from 'express';
import { User } from '../_model/user.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  userName!:string;

  userProfile!: User;
  
  loginForm!: FormGroup;
  
  constructor(private service:JwtserviceService,
    private fb:FormBuilder,
    private userAuthService:UserAuthService,
    private router:Router,
   
    ){}
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      userName:['',[Validators.required]],
      userPassword:['',[Validators.required]]

  })

    }
    
  
// submitForm(){
//   this.service.login(this.loginForm.value)
//   .subscribe(
//     (response:any)=>{
//       console.log(response.jwtToken);
//       console.log(response.user.role);
//       this.userAuthService.setRoles(response.user.role);
//       this.userAuthService.setToken(response.jwtToken);
//       //console.log(response)
//       const role=response.user.role[0].roleName;
//       if(role=='Admin'){
//         this.router.navigate(['/admin'])
           
//       }else{
//         this.router.navigate(['/user']);
//       }
//     },
//     (error: any)=>{
//       // Show alert message
//       alert('Login failed. Please check your credentials and try again.')
      
//     }
//   )
// }
login(loginForm: NgForm) {
  this.service.login(loginForm.value).subscribe(
    (response: any) => {
      
      this.userAuthService.setRoles(response.user.role);
      this.userAuthService.setToken(response.jwtToken);

      const role = response.user.role[0].roleName;
      if (role === 'Admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
        console.log(response.user);
        this.userName=response.user.userName;
        
      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}
registerUser(){
  this.router.navigate(['/register']);
}



  

}
