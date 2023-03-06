import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/Categorie';
import { CategorieService } from 'src/app/service/categorie.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: [
  ]
})
export class CategoriesComponent implements OnInit {


  categories? : Categorie [];

  constructor(private categorieservice: CategorieService) { }

  ngOnInit(): void {

    this.chargerCategories();
  }

  chargerCategories(){
    this.categorieservice.listeCategorie().subscribe // subcribe 5ater ili listeproduit traj3elna type observable
    (cat => {console.log(cat); // obtionel
    this.categories = cat;
    });
    }

    supprimerCategorie(c: Categorie){
         
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.categorieservice.supprimerCategorie(c.idCategory).subscribe(() => {
      console.log("categorie supprimé");
      this.chargerCategories(); // n3awedou njibou jdid always
      });
      }

}
