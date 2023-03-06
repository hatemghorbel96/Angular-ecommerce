import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from './model/Produit';
import { AuthService } from './service/auth.service';
import { ProduitService } from './service/produit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myproducts';
  produits: Produit[] = [];
  constructor (public authService: AuthService,private router : Router,private produitService: ProduitService) {}


  ngOnInit () {
    this.authService.loadToken();
    if (this.authService.getToken()==null ||
    this.authService.isTokenExpired())
    this.router.navigate(['/login']);

    this.listProduct();
    }


 public onLogout(){
    this.authService.logout();
  }

  listProduct(){
       this.produitService.listeProduit().subscribe // subcribe 5ater ili listeproduit traj3elna type observable
      (prods => {console.log(prods); // obtionel
      this.produits = prods.filter(prods => prods.promo !=null);
      }); 
    }
  
}
