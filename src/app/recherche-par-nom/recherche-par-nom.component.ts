import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Produit } from '../model/Produit';
import { ImageProsService } from '../service/image-pros.service';
import { ProduitService } from '../service/produit.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {


  nomProduit! : string; // input nom
  produits!: Produit[];
  searchTerm!: string;
  allProduits! : Produit[];
  errorMessage! : string;
  valueid!: number;
  constructor(private produitService: ProduitService,private imagePros: ImageProsService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.produitService.listeProduit().pipe(
      map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
      ).subscribe(prods => {
      console.log(prods);
      /* this.allProduits = prods; */
      this.produits = prods;
      });
  }

  rechercherProds(){
    this.produitService.rechercherParNom(this.nomProduit).pipe(
      map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
      ).
    subscribe(prods => {this.produits = prods;
    console.log(prods)});
    }

    onKeyUp(filterText : string){
      this.produits = this.allProduits.filter(item =>
      item.nomProduit.toLowerCase().includes(filterText));
      }

      updateStatut(p:Produit,id:number) {
         
        let promo = p.trend;
        if (promo ==null)
        {
          p.trend=false;
        }
       
        p.trend = !promo;
        
        this.produitService.updateProduitByID(p,id).subscribe({
          next :(data)=>{
            p.trend = !promo;
          },
          error : err =>{
            this.errorMessage=err;
          }
        })
  
  }


  bestpromo(p:Produit,id:number) {
         
    let promo = p.bestoffer;
    if (promo ==null)
    {
      p.bestoffer=false;
    }
   
    p.bestoffer = !promo;
    
    this.produitService.bestoffer(p,id).subscribe({
      next :(data)=>{
        p.bestoffer = !promo;
      },
      error : err =>{
        this.errorMessage=err;
      }
    })

}

  publicite1(p:Produit,id:number) {
         
    let promo = p.pub1;
    if (promo ==null)
    {
      p.pub1=false;
    }
   
    p.pub1 = !promo;
    
    this.produitService.pub1(p,id).subscribe({
      next :(data)=>{
        p.pub1 = !promo;
      },
      error : err =>{
        this.errorMessage=err;
      }
    })

}

publicite2(p:Produit,id:number) {
         
  let promo = p.pub2;
  if (promo ==null)
  {
    p.pub2=false;
  }
 
  p.pub2 = !promo;
  
  this.produitService.pub2(p,id).subscribe({
    next :(data)=>{
      p.pub2 = !promo;
    },
    error : err =>{
      this.errorMessage=err;
    }
  })

}

exporToExcel() {
  this.produitService.getExcelData().subscribe((responseMessage) => {
    let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  })
 
}

//npm install pdfmake
generatepdf(){
  const document = this.produitService.getDocument();
  alert("mrigel");
  pdfMake.createPdf(document).open(); 
}

  

}
