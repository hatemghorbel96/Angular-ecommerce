import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../model/cart-item';
import { Produit } from '../model/Produit';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { ProduitService } from '../service/produit.service';
import { Comment } from 'src/app/model/comment';
import { CommentService } from '../service/comment.service';
import { ImageProsService } from '../service/image-pros.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProduitsComponent implements OnInit {


  produits: Produit[] = [];
  searchMode: boolean = false;
  currentCategoryID! : number;
 

  value = '';
  value1 = '';
  value2 = 0;
  NULL = '';
  thenBlock: TemplateRef<any>|null = null;
  elseBlock: TemplateRef<any>|null = null;
  andelseBlock:TemplateRef<any>|null = null;
  comments: Comment[] = [];
  sort = 0;
  valuemin = '0';
  valuemax = '';
  b! : boolean;
  constructor(private produitService: ProduitService,public authService: AuthService,
    private router: Router,private cartService: CartService,private route: ActivatedRoute,private commentservice: CommentService,private imagePros: ImageProsService) {

       
   }

  ngOnInit(): void {
    
       this.route.paramMap.subscribe(()=>{
      this.listProduct();
    });

    
  }

      listProduct(){
          /*   this.produitService.listeProduit().subscribe // subcribe 5ater ili listeproduit traj3elna type observable
            (prods => {console.log(prods); // obtionel
            this.produits = prods;
            }); */

            this.searchMode = this.route.snapshot.paramMap.has('keyword');

           

            if (this.searchMode) {
              this.handleSearchProducts();
            }
            
            
           
            else {
              this.handleListProducts();
            }
            }

            

 /*  handleSearchprice() {
    
     const max: string = this.route.snapshot.paramMap.get('max')!;
     const min: string = this.route.snapshot.paramMap.get('min')!;
              // now search for the products using keyword
              this.produitService.searchByPrix(max,min).subscribe(
                data => {
                  this.produits = data;
                }
              )
  } */

  handleSearchprice() {
    
    const max: string = this.valuemax;
    const min: string = this.valuemin;
             // now search for the products using keyword
             this.produitService.searchByPrix(max,min).pipe(
              map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
              ).subscribe(
               data => {
                 this.produits = data;
               }
             )
 }

  

            handleSearchProducts() {

              const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
          
              // now search for the products using keyword
              this.produitService.searchProducts(theKeyword).pipe(
                map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
                ).subscribe(
                data => {
                  this.produits = data;
                }
              )
            }
          
            handleListProducts(){
              // check if "id" parapeter is available
              const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');
          
                if (hasCategoryId){
                  // get the "id" param string convert to a number using the "+" symbol
                  this.currentCategoryID = +this.route.snapshot.paramMap.get('id')!;
                }else {
                  // not category id avaible default to cateogry id 1
                  this.currentCategoryID = 1;
                }
                
              this.produitService.getProductList(this.currentCategoryID).pipe(
                map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
                ).subscribe(
                data => {
                  this.produits=data;
                  console.log(data);
                }
              )
            }

            supprimerProduit(p: Produit){
         
            let conf = confirm("Etes-vous sûr ?");
            if (conf)
            this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
            console.log("produit supprimé");
            this.listProduct(); // n3awedou njibou jdid always
            });
            }

            addToCart(theProduct: Produit){
              console.log(`Adding to cart: ${theProduct.nomProduit}, ${theProduct.prixProduit}`);
          
              // TODO ... do the real work
              const theCartItem = new CartItem(theProduct);
          
              this.cartService.addToCart(theCartItem);
            }

            addfav(p: Produit,username:string,productid : number){
              
              this.produitService.addfavorit(p,username,productid).subscribe(
                p => {console.log(p); 
                  this.listProduct();
                });

            }

            removefav(p: Produit,username:string,nomProduit : string){
              
              this.produitService.removefavorit(p,username,nomProduit).subscribe(
                p => {console.log(p); 
                  this.listProduct();
                });

            }


            sortBy() {
    
              if (this.sort==1){
                return this.produits.sort((b, a) => new Date(b.prixProduit).getTime() - new Date(a.prixProduit).getTime());
              }
              else if(this.sort==2) {
                return this.produits.sort((a, b) => new Date(b.prixProduit).getTime() - new Date(a.prixProduit).getTime());
              }
          
              else if(this.sort==3) {
                return this.produits.sort((a, b) => (a.nomProduit < b.nomProduit ? -1 : 1));
                
              }
          
              else if(this.sort==4) {
                return this.produits.sort((b, a) => (a.nomProduit < b.nomProduit ? -1 : 1));
              }
          
             
          
              else  {
                return this.produits.sort((a, b) => (a.idProduit < b.idProduit ? -1 : 1));
              }
          
              
              
            }

            

}
