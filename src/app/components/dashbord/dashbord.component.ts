import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions,registerables  } from 'chart.js';
import { Categorie } from 'src/app/model/Categorie';
import { Order } from 'src/app/model/order';
import { Produit } from 'src/app/model/Produit';
import { User } from 'src/app/model/User';
import { CategorieService } from 'src/app/service/categorie.service';
import { OrderService } from 'src/app/service/order.service';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  orders: Order[] = [];
  produits: Produit[] = [];
  p!: number;
  categories! : Categorie[];
  notverfier!: number;
  verfier!: number;
  shipping!: number;
  delivery!: number;
  cat!: number;
  clients:User[]=[];
  oc!: number;
  nov!: number;
  dataReceived = false;
   /* currentDate = new Date("10/30/2022");
   timestamp = this.currentDate;
   gg=this.timestamp.getMonth()+1; */
   chart: any = [];
  constructor(private orderservice : OrderService,private produitService: ProduitService,private categorieservice: CategorieService) { }

  ngOnInit(): void {
    this.orderservice.listeOrder().subscribe(

      commande => {
        this.orders = [...commande];
        this.oc = this.orders.filter(item => item.dateCreated && new Date(item.dateCreated).getMonth() === 9).length
        this.nov = this.orders.filter(item => item.dateCreated && new Date(item.dateCreated).getMonth() === 10).length
        this.dataReceived = true;
        this.lineChartData.datasets[0].data = [this.oc, this.nov, 5]

      })
    this.chargerProduits()
    this.listOrders();
    this.chargerCategories();
    this.getbestclient();
   
  }

  getbestclient() {
    
    this.produitService.bestclients().subscribe 
         (b => {
          console.log("best clients",b); 
         this.clients = b;
        
         });   
        
  }


 
 
  
  
  public lineChartData: ChartConfiguration<'line'>['data'] = {   
    
    labels: [     
      'October',
      'Novermber',
      'December'    
    ],
    
    datasets: [
      {
        data:[this.oc,this.nov,5],
        
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;
  public lineChartType!: "line";
 

  

  
  listOrders() {
    this.orderservice.listeOrder().subscribe 
         (commande => {console.log(commande); 
         this.orders = commande;
         this.notverfier=this.orders.filter(item => item.status==1).length
         this.verfier=this.orders.filter(item => item.status==2).length
         this.shipping=this.orders.filter(item => item.status==3).length
         this.delivery=this.orders.filter(item => item.status==4).length
        
          
         console.log("date",this.oc)
         }); 
         

        // return this.orders.filter(item => item.status === 1);
}

    chargerProduits(){
      this.produitService.listeProduit().subscribe 
      (prods => {console.log(prods); 
      this.produits = prods;
       this.p = this.produits.length;
    });
      }
     
     
     
      chargerCategories(){
        this.categorieservice.listeCategorie().
        subscribe(cats => {this.categories = cats;
          this.cat=cats.length;
        console.log(cats);
        });
        }

     

}
