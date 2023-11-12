import { role } from "./role.model";

export interface User{
   
    
      firstName: string;
      lastName: string;
      role: role[]; // Nested role property
      userName: string;
      userPassword: string;

}