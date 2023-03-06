import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Produit } from '../model/Produit';
import { AuthService } from '../service/auth.service';
import { ImageProsService } from '../service/image-pros.service';
import { ProduitService } from '../service/produit.service';

@Component({
  selector: 'app-admin-prod',
  templateUrl: './admin-prod.component.html',
  
})
export class AdminProdComponent implements OnInit {
  produits? : Produit [];
  

  constructor(private produitService: ProduitService,public authService: AuthService,private imagePros: ImageProsService) {

       
   }

  ngOnInit(): void {
    
      this.chargerProduits(); // ijektina chargerproduit bech kol mara ychargiha mel awel w jdid
  }

          chargerProduits(){
            this.produitService.listeProduit()
            .pipe(
              map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
              )
            .subscribe // subcribe 5ater ili listeproduit traj3elna type observable
            (prods => {console.log(prods); // obtionel
            this.produits = prods;
            });
            }


            supprimerProduit(p: Produit){
         
            let conf = confirm("Etes-vous sûr ?");
            if (conf)
            this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
            console.log("produit supprimé");
            this.chargerProduits(); // n3awedou njibou jdid always
            });
            }

}
