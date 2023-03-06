import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Categorie } from 'src/app/model/Categorie';
import { Produit } from 'src/app/model/Produit';
import { CategorieService } from 'src/app/service/categorie.service';
import { ImageProsService } from 'src/app/service/image-pros.service';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',

})
export class PromotionComponent implements OnInit {

  currentProduit = new Produit();
  categories! : Categorie[];
  updatedCatId! : number;
  produit!: Produit;
  constructor(private imagePros: ImageProsService,private activatedRoute: ActivatedRoute, private produitService: ProduitService,private router : Router,private categorieservice : CategorieService,private route: ActivatedRoute) { }

  
  ngOnInit(): void {
    this.productdetails()
    
    this.categorieservice.listeCategorie().subscribe(cats => {this.categories = cats;
        console.log(cats);
        });
        this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).
        subscribe( prod =>{ this.currentProduit = prod;
        this.updatedCatId =this.currentProduit.categorie.idCategory;
        } ) ;
        }

  updateProduit() {
    this.currentProduit.categorie = this.categories.find(cat => cat.idCategory == this.updatedCatId)!;
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.produitService.updatepromo(this.currentProduit,theProductId).subscribe(
      prod => {this.router.navigate(['listpromo']); }
    );
    }

    productdetails(){
      // get the id from parameter and covert string to number using the + symbol
      const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
  
      this.produitService.consulterProduit(theProductId).pipe(
        map((product:Produit)=> this.imagePros.createImage(product))
        ).subscribe(
        data => {
          this.produit = data;
        }
      )
  
     
    }
  

}
