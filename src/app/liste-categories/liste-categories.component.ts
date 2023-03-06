import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/Categorie';
import { CategorieService } from '../service/categorie.service';
import { ProduitService } from '../service/produit.service';
@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styles: [
  ]
})
export class ListeCategoriesComponent implements OnInit {


  categories! : Categorie[]; // initialiser un tableau de category

  updatedCat:Categorie = {"idCategory":0,"nomCategory":"","description":"","produits":[]};

  ajout:boolean=true;

  constructor(private produitService : ProduitService,private categorieservice: CategorieService) { }

  ngOnInit(): void {
    this.categorieservice.listeCategorie().
    subscribe(cats => {this.categories = cats;
    console.log(cats);
    });
  }

  categorieUpdated(cat:Categorie){
    console.log("Cat updated event",cat);
    this.produitService.ajouterCategorie(cat).
    subscribe( ()=> this.chargerCategories()); // lors de l'ajout du categorie n3aytou fard mara lel list jdid mte3 categories
    }

    chargerCategories(){
      this.produitService.listeCategories().
      subscribe(cats => {this.categories = cats._embedded.categories;
      console.log(cats);
      });
      }

      updateCat(cat:Categorie) {
        this.updatedCat=cat;
        this.ajout=false;
        }

     

}
