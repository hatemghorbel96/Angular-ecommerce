import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styles: [
  ]
})
export class UpdateCategoryComponent implements OnInit {

  @Input()
  categorie! : Categorie;
  @Output()
  categorieUpdated = new EventEmitter<Categorie>();

  @Input()
  ajout!:boolean;

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.categorie);
  }
  
  saveCategorie(){
    this.categorieUpdated.emit(this.categorie);
    }
}
