import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',

})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  
  firstParam!: string | null;
  constructor(private orderservice : OrderService,private route: ActivatedRoute) { }

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

sortBy(prop: string) {
 return this.orders.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
}

}
