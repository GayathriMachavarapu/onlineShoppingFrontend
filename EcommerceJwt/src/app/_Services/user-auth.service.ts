import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  
  
  constructor(private http:HttpClient){}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles')as any);
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken')as any;
  }

  public setUserName(userName:string){
    localStorage.setItem('userName',userName);
  }

  public getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
  public isAdmin(){
    const roles:any[]=this.getRoles();
    return roles[0].roleName==='Admin';
  }
  public isUser(){
    
    const roles:any[]=this.getRoles();
    return roles[0].roleName==='User';
  }
}

