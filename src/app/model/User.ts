import { Role } from "./role";
import { Comment } from "./comment";
import { Order } from "./order";

export class User{
    user_id!:number;
    username!:string ;
    password !: string ;
    roles!:Role[];
    enabled! :boolean ;
    comments!: Comment[];
    firstname!: string;
    lastname!:string;
    phone!: string;
    email!: string;
    orders!: Order[];
    
    
   
}