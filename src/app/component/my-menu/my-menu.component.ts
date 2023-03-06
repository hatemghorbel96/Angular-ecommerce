import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';
import { Produit } from 'src/app/model/Produit';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-my-menu',
  templateUrl: './my-menu.component.html',
  
})
export class MyMenuComponent implements OnInit {

  orders: Order[] = [];
  produits: Produit[] = [];
  constructor(public authService: AuthService,private orderservice : OrderService,private route: ActivatedRoute,private produitService: ProduitService) { }

  ngOnInit(): void {
    this.listOrderss();

    
  }

  listOrderss() {
    /* const firstParam = this.route.snapshot.queryParamMap.get('username'); */
   /*  const orderusername = +this.route.snapshot.paramMap.get('id')!; */
   const orderusername = this.route.snapshot.paramMap.get('username')!;
    this.orderservice.consulteMyOrder(orderusername).subscribe 
         (commande => {console.log(commande); 
         this.orders = commande;
         }); 
}

}
