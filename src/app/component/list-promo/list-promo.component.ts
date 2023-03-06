import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Produit } from 'src/app/model/Produit';
import { ImageProsService } from 'src/app/service/image-pros.service';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-list-promo',
  templateUrl: './list-promo.component.html',
 
})
export class ListPromoComponent implements OnInit {

 
  nomProduit! : string; // input nom
  produits!: Produit[];
  searchTerm!: string;
  allProduits! : Produit[];
 

  constructor(private produitService: ProduitService,private imagePros: ImageProsService) { }

  ngOnInit(): void {

    this.produitService.listeProduit().pipe(
      map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
      )
      .subscribe(prods => {
      console.log(prods);
      /* this.allProduits = prods; */
      this.produits = prods;
      });
  }

  rechercherProds(){
    this.produitService.rechercherParNom(this.nomProduit).pipe(
      map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
      )
      .
    subscribe(prods => {this.produits = prods;
    console.log(prods)});
    }

    onKeyUp(filterText : string){
      this.produits = this.allProduits.filter(item =>
      item.nomProduit.toLowerCase().includes(filterText));
      }


    

  


}
