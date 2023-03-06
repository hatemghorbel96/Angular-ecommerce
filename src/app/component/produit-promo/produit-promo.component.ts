import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CartItem } from 'src/app/model/cart-item';
import { Produit } from 'src/app/model/Produit';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { CommentService } from 'src/app/service/comment.service';
import { ImageProsService } from 'src/app/service/image-pros.service';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-produit-promo',
  templateUrl: './produit-promo.component.html',

})
export class ProduitPromoComponent implements OnInit {
  produits: Produit[] = [];
  thenBlock: TemplateRef<any>|null = null;
  elseBlock: TemplateRef<any>|null = null;
  andelseBlock:TemplateRef<any>|null = null;
  constructor(private produitService: ProduitService,public authService: AuthService,
    private router: Router,private cartService: CartService,private route: ActivatedRoute,private commentservice: CommentService,private imagePros: ImageProsService) { }

  ngOnInit(): void {
    this.listProduct()
  }


  listProduct(){
    this.produitService.listeProduit().pipe(
      map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
      ).subscribe // subcribe 5ater ili listeproduit traj3elna type observable
   (prods => {console.log(prods); // obtionel
   this.produits = prods.filter(prods => prods.promo !=null);
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

}
