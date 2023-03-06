import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/Categorie';
import { CategorieService } from 'src/app/service/categorie.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
 
})
export class CategoriesListComponent implements OnInit {

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

}
