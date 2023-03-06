import { Component, OnInit } from '@angular/core';
import { Role } from '../model/role';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',

})
export class UsersComponent implements OnInit {

  users? : User [];
  roles! : Role[];
  errorMessage! : string;

  constructor(private registerService : RegisterService,public authService: AuthService) { }

  ngOnInit(): void {
   

      this.registerService.listeRoles().subscribe(
        data => {
          console.log('product categories='+JSON.stringify(data));
          this.roles = data;
        }
      );

    this.chargerUsers(); 
  }

  chargerUsers(){
    this.registerService.listeUser().subscribe // subcribe 5ater ili listeproduit traj3elna type observable
    (users => {console.log(users); // obtionel
    this.users = users;
    });
    }

   

    updateStatut(u:User) {
      let promo = u.enabled;
      u.enabled = !promo;
      this.registerService.updateStatut(u).subscribe({
        next :(data)=>{
          u.enabled = !promo;
        },
        error : err =>{
          this.errorMessage=err;
        }
      })

}

}
