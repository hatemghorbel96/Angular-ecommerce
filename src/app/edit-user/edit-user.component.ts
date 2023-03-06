import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../model/role';
import { User } from '../model/User';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  currentUser = new User();
  roles! : Role[];
  updatedRoleId! : number;
  
  constructor(private activatedRoute: ActivatedRoute, private registerService : RegisterService,private router : Router) { }

  ngOnInit(): void {
    this.registerService.listeRoles().subscribe(
      data => {
        console.log('product categories='+JSON.stringify(data));
        this.roles = data;
      }
    );
    this.registerService.consulterUser(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentUser = prod;
   
    
    } ) ;
  }

  updateUser() {
    
    this.registerService.updateUser(this.currentUser).subscribe(
      prod => {this.router.navigate(['users']); }
    );
    }

}
