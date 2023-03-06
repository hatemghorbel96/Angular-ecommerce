import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../service/produit.service';
import { Produit } from '../model/Produit';
import { Categorie } from '../model/Categorie';
import { CategorieService } from '../service/categorie.service';
import { map } from 'rxjs';
import { ImageProsService } from '../service/image-pros.service';
import { FileHandle } from '../model/file-handle.model';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styles: [
  ]
})
export class UpdateProduitComponent implements OnInit {

  currentProduit = new Produit();
  categories! : Categorie[];
  updatedCatId! : number;
  img!:string;
  sanitizer: any;
  constructor(private activatedRoute: ActivatedRoute, private produitService: ProduitService,private router : Router,private categorieservice : CategorieService,private imagePros: ImageProsService) { }

  ngOnInit(): void {
    
    this.categorieservice.listeCategorie().subscribe(cats => {this.categories = cats;
        console.log(cats);
        });
        this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).pipe(
          map((product:Produit)=> this.imagePros.createImage(product))
          ).
        subscribe( prod =>{ this.currentProduit = prod;
        this.updatedCatId =this.currentProduit.categorie.idCategory;
        } ) ;
        }

  updateProduit() {
    this.currentProduit.categorie = this.categories.find(cat => cat.idCategory == this.updatedCatId)!;
    const productFormData= this.prepareFormData(this.currentProduit)
    this.produitService.updatedataProduit(productFormData).subscribe(
      prod => {this.router.navigate(['produits']); }
    );
    }

    prepareFormData(currentProduit : Produit):FormData{
      const formData = new FormData();
      
      formData.append(
        'produit',
        new Blob([JSON.stringify(currentProduit)],{type: 'application/json'})
      );

      for(var i =0; i< currentProduit.productImages.length; i++){
        formData.append('imageFile',
        currentProduit.productImages[i].file,
        currentProduit.productImages[i].file.name
        );
      }

      return formData;
      
  }


 
  onFileSelected(event){
  if(event.target.files) {
    
   const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
           )

      }

      this.img =  
        window.URL.createObjectURL(file)
         .toString();
    

    /*   this.img = 
        window.URL.createObjectURL(file)
         .toString() */
         
        this.currentProduit.productImages.push(fileHandle); 
  } 
 

  }

  removeImages(i){

    this.currentProduit.productImages.splice(i, 1);


  }

  fileDropped(fileHandle : FileHandle){
    this.currentProduit.productImages.push(fileHandle);
  }

  
  

}
