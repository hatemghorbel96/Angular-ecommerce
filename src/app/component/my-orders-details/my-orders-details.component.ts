import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Order } from 'src/app/model/order';
import { Produit } from 'src/app/model/Produit';
import { ImageProsService } from 'src/app/service/image-pros.service';
import { OrderService } from 'src/app/service/order.service';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-my-orders-details',
  templateUrl: './my-orders-details.component.html',

})
export class MyOrdersDetailsComponent implements OnInit {

  order: Order = new Order();
  produits? : Produit [];
  
  constructor(private orderservice : OrderService,private route: ActivatedRoute,private router : Router,private imagePros: ImageProsService,private produitService: ProduitService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.orderdetails();
    });

    this.chargerProduits();
  }

  orderdetails() {
   
     const orderId: number = +this.route.snapshot.paramMap.get('id')!;

    this.orderservice.consulterOrder(orderId).subscribe(
      data => {
        this.order = data;
      }
    )
  }

  chargerProduits(){
    this.produitService.listeProduit()
    .pipe(
      map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
      )
    .subscribe // subcribe 5ater ili listeproduit traj3elna type observable
    (prods => {console.log(prods); // obtionel
    this.produits = prods;
    });
    }

}
