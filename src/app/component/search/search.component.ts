import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/model/Produit';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',

})
export class SearchComponent implements OnInit {

  produits! : Produit [];
  value!: boolean;
  constructor(private router: Router,private produitService: ProduitService) { }

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(){
    this.produitService.listeProduit().subscribe 
    (prods => {console.log(prods); 
    this.produits = prods;
    });
    }

  keyword = 'nomProduit';


  selectEvent(item: any){
    console.log(`value=${item.nomProduit}`);
    this.router.navigateByUrl(`/search/${item.nomProduit}`);
  }
  

 

}
