import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/User';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
 
})
export class ChangePasswordComponent implements OnInit {

  currentUser = new User();
  roles! : Role[];
  updatedRoleId! : number;
  message!: string;
  constructor(private route: ActivatedRoute, private registerService : RegisterService,private router : Router) { }

  ngOnInit(): void {
    

    

    this.curentuser();
   
  }


  
  curentuser() {
    const user = this.route.snapshot.params['username'];
    this.registerService.consulterUserbyusername(user).
    subscribe( u =>{ this.currentUser = u;
   
    
    } ) ;
  }

  updateUser() {
    const orderusername = this.route.snapshot.paramMap.get('username')!;
    this.registerService.updatePassInfo(this.currentUser,orderusername).subscribe(
      
    );

    this.message="user udpated";
    
    }
    
}
