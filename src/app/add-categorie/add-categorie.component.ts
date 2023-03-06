import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/Categorie';
import { CategorieService } from './../service/categorie.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styles: [
  ]
})
export class AddCategorieComponent implements OnInit {


  newCategorie = new Categorie();
  categories! : Categorie[];
  newIdCat! : number;
 

  constructor(private categorieService: CategorieService,private router : Router) { }

  ngOnInit(): void {
  }

  addCategorie(){
   
    this.categorieService.ajouterCategorie(this.newCategorie).subscribe(
      cat => {console.log(cat); // just pour afficher dans le console
      this.router.navigate(['categories']);
    });
    }

}
