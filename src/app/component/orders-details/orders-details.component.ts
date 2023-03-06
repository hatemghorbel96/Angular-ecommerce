import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Order } from 'src/app/model/order';
import { Produit } from 'src/app/model/Produit';
import { ImageProsService } from 'src/app/service/image-pros.service';
import { OrderService } from 'src/app/service/order.service';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',

})
export class OrdersDetailsComponent implements OnInit {

  order: Order = new Order();
  produits? : Produit [];
  currentOrder = new Order();
  successMessage!: string;

  constructor(private orderservice : OrderService,private route: ActivatedRoute,private router : Router,private imagePros: ImageProsService,private produitService: ProduitService) { }

  ngOnInit(): void {
   
    this.route.paramMap.subscribe(()=>{
      this.orderdetails();
    });

    this.orderservice.consulterOrder(this.route.snapshot.params['id']).subscribe( prod =>{ this.currentOrder = prod;
    
    } ) ;


    this.chargerProduits();
   
   
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

  orderdetails() {
    this.successMessage = '';
     const orderId: number = +this.route.snapshot.paramMap.get('id')!;

    this.orderservice.consulterOrder(orderId).subscribe(
      data => {
        this.order = data;
        console.log(data);
      }
    )
  }

  updateOrder() {
    const orderId: number = +this.route.snapshot.paramMap.get('id')!;
    this.orderservice.updateOrder(this.currentOrder,orderId).subscribe(
      
    );
    let s=''
    if (this.currentOrder.status == 1) 
    s = ' non verfierd' 
    else if (this.currentOrder.status == 2) 
    s = ' verfierd' 
    else if (this.currentOrder.status == 3) 
    s = ' shipping' 
    else if (this.currentOrder.status == 4) 
    s = ' delivred' 
    this.successMessage = 'order '+ this.currentOrder.orderTrackingNumber+''+s;
    }

}
