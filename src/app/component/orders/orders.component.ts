import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',

})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  value1 = 0;
  value2!: number;
  valueid!: number;
  constructor(private orderservice : OrderService) { }

  ngOnInit(): void {
    this.listOrders();
  }


  listOrders() {
       this.orderservice.listeOrder().subscribe 
            (commande => {console.log(commande); 
            this.orders = commande;
            }); 
  }

 /*  sortBy(prop: string) {
    return this.orders.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  } */

  sortBy() {

    

    if (this.value1==5){
      return this.orders.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
    }
    else if(this.value1==1) {

      
        return this.orders.filter(item => item.status === 1);
      
     
    }

    else if(this.value1==2) {
      return this.orders.filter(item => item.status === 2);
    }

    else if(this.value1==3) {
      return this.orders.filter(item => item.status === 3);
    }

    else if(this.value1==4) {
      return this.orders.filter(item => item.status === 4);
    }

   

    else  {
      return this.orders.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
    }
    
    /* if (this.value1==5){
      return this.orders.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
    }
    else if(this.value1==1) {
      return this.orders.sort((a, b) => (a.status ==1 ? -1 : 1));
    }

    else if(this.value1==2) {
      return this.orders.sort((a, b) => (a.status ==2   ? -1 : 1));
    }

    else if(this.value1==3) {
      return this.orders.sort((a, b) => (a.status ==3 ? -1 : 1));
    }

    else if(this.value1==4) {
      return this.orders.sort((a, b) => (a.status ==4 ? -1 : 1));
    }

   

    else  {
      return this.orders.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
    } */

    
    
  }

}
