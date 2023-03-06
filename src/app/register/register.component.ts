import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
 
})
export class RegisterComponent implements OnInit {
  newUser= new User();
  constructor(private registerService : RegisterService,private router : Router ){ }

  ngOnInit(): void {
   
  }

  register(){
  
    this.registerService.register(this.newUser).subscribe(
      user => {console.log(user); // just pour afficher dans le console
    this.router.navigate(['login']);
    });
    }

}
