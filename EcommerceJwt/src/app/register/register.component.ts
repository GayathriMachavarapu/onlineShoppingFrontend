import { Component, OnInit } from '@angular/core';
import { JwtserviceService } from '../_Services/jwtservice.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!:FormGroup;

 
  constructor(
    private service:JwtserviceService,
    private fb:FormBuilder,
    private router:Router
    ){}
  ngOnInit(): void {
   this.registerForm=this.fb.group({
    userName:['',[Validators.required]],
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    userPassword:['',Validators.required],
    confirmUserPassword:['',[Validators.required]],
   },{validator: this.passwordMathValidator}

   )
   
  }
  passwordMathValidator(formGroup:FormGroup){
    const userPassword=formGroup.get('userPassword')?.value;
    const confirmUserPassword=formGroup.get('confirmUserPassword')?.value;
    if(userPassword!=confirmUserPassword){
      formGroup.get('confirmUserPassword')?.setErrors({passwordMissMatch:true});
    }else{
      formGroup.get('confirmUserPassword')?.setErrors(null);
    }
  }
  // submitForm(){
  //   console.log(this.registerForm?.value);
  //   this.service.register(this.registerForm.value).subscribe(
  //     (response)=>{
  //       if(response!=null){
  //         this.router.navigate(['/login']);
  //       }
  //     }
  //   )
  // }
  register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.service.register(registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
