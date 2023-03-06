import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/User';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  
})
export class AddroleComponent implements OnInit {

  currentUser = new User();
  valuerole! : string;

  roles? : Role [];
  constructor(private activatedRoute: ActivatedRoute, private registerService : RegisterService,private router : Router) { }

  ngOnInit(): void {

    this.registerService.consulterUser(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentUser = prod;
    
    
    } ) ;

    this.listrole();
  }


  listrole() {
     this.registerService.listeRoles().subscribe // subcribe 5ater ili listeproduit traj3elna type observable
            (prods => {console.log(prods); // obtionel
            this.roles = prods;
            });
  }

  addrole(u:User){
    this.registerService.addrole(u,this.currentUser.username,this.valuerole).subscribe(
      prod => {console.log(prod); // just pour afficher dans le console
   /*  this.router.navigate(['admin-prod']); */
    
    this.registerService.consulterUser(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentUser = prod;
   
    
    } ) ;
     });
    }

    removerole(u:User){
      this.registerService.removerole(u,this.currentUser.username,this.valuerole).subscribe(
        prod => {console.log(prod); // just pour afficher dans le console
       /* this.router.navigate(['admin-prod']);  */
       this.registerService.consulterUser(this.activatedRoute.snapshot.params['id']).
       subscribe( prod =>{ this.currentUser = prod;
      
       
       } ) ;
      });

    }

}
