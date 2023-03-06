import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Categorie } from '../model/Categorie';
import { Produit } from '../model/Produit';
import { CategorieService } from '../service/categorie.service';
import { ImageProsService } from '../service/image-pros.service';
import { ProduitService } from '../service/produit.service';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
  styles: [
  ]
})
export class RechercheParCategorieComponent implements OnInit {

  produits! : Produit[];
  IdCategorie! : number;
  categories! : Categorie[];

  constructor(private produitService: ProduitService,private categorieservice: CategorieService,private imagePros: ImageProsService) { }

  ngOnInit(): void {
    this.categorieservice.listeCategorie().subscribe(cats => {this.categories = cats;
          console.log(cats);
    })
  }

  onChange() {
    this.produitService.rechercherParCategorie(this.IdCategorie).pipe(
      map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
      ).
    subscribe(prods =>{this.produits=prods});
    }

}
