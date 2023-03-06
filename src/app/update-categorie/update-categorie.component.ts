import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Categorie } from '../model/Categorie';
import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styles: [
  ]
})
export class UpdateCategorieComponent implements OnInit {


  currentCategorie = new Categorie();
 

  constructor(private activatedRoute: ActivatedRoute,private categorieService: CategorieService,private router : Router) { }

  ngOnInit(): void {

    this.categorieService.consulterCategorie(this.activatedRoute.snapshot.params['id']).
        subscribe( cat =>{ this.currentCategorie = cat;
        } ) ;
      }

      updateCategorie() {
       
        this.categorieService.updateCategorie(this.currentCategorie).subscribe(
          cat => {this.router.navigate(['categories']); }
        );
        }

}
