import { ProduitService } from './../service/produit.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/Produit';
import { Categorie } from '../model/Categorie';
import { Router } from '@angular/router';
import { CategorieService } from '../service/categorie.service';
import { FileHandle } from '../model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
 
})
export class AddProduitComponent implements OnInit {

  newProduit =  new Produit();
  categories! : Categorie[];
  newIdCat! : number;
  newCategorie! : Categorie;
  message :string | undefined;
  myDate = new Date();
  img!:string;



  constructor(private produitService: ProduitService,private router : Router,private categorieservice : CategorieService , private sanitizer : DomSanitizer) {

    
   }

  ngOnInit(): void {
        this.categorieservice.listeCategorie().subscribe(cats => {console.log(cats);
          this.categories = cats;
          }
          );
          
  }



  addProduit(){

    this.newProduit.categorie = this.categories.find(cat => cat.idCategory == this.newIdCat)!; // hazina selectioné categorie par id
    const productFormData= this.prepareFormData(this.newProduit)

    
    this.produitService.ajouterProduit(productFormData).subscribe(
      prod => {console.log(prod); // just pour afficher dans le console
    /* this.router.navigate(['admin-prod']); */
    });
    }


   

    prepareFormData(newProduit : Produit):FormData{
        const formData = new FormData();
        
        formData.append(
          'produit',
          new Blob([JSON.stringify(newProduit)],{type: 'application/json'})
        );

        for(var i =0; i< newProduit.productImages.length; i++){
          formData.append('imageFile',
          newProduit.productImages[i].file,
          newProduit.productImages[i].file.name
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
           
          this.newProduit.productImages.push(fileHandle); 
    } 
   

    }

    removeImages(i){

      this.newProduit.productImages.splice(i, 1);


    }

    fileDropped(fileHandle : FileHandle){
      this.newProduit.productImages.push(fileHandle);
    }

 

    

    
  


}
