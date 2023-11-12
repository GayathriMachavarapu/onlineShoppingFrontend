import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { User } from '../_model/user.model';
const base_Url=["http://localhost:9090"];

@Injectable({
  providedIn: 'root'
})
export class JwtserviceService {

  constructor(private http:HttpClient,
    private userAuthService:UserAuthService
    ) { }
  register(signRequest:any):Observable<any>{
    return this.http.post(base_Url+'/user/adduser',signRequest);
  }
  login(loginRequest:any):Observable<any>{
    return this.http.post(base_Url+'/authenticate',loginRequest);
  }

  public roleMatch(allowedRoles: string[]): boolean {
    let roleMatch=false;
    const userRoles: any = this.userAuthService.getRoles();
  
    if (userRoles != null && userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            roleMatch=true;
            return roleMatch;  // If there is a match, return true immediately
          }
        }
      }
    }
  
    return roleMatch;  // If no match is found, return false
  }

  public forUser(){
    return this.http.get(base_Url+'/user/forUser',{
      responseType:'text',
    });
  }
  public forAdmin(){
    return this.http.get(base_Url+'/user/forAdmin',{
      responseType:'text',
    }); 
  }

  
}
