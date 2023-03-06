import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Produit } from 'src/app/model/Produit';
import { Slider } from 'src/app/model/slider';
import { ImageProsService } from 'src/app/service/image-pros.service';
import { ProduitService } from 'src/app/service/produit.service';
import { SliderService } from 'src/app/service/slider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 
})
export class HomeComponent implements OnInit {
  produits!: Produit[];
  pubs1!: Produit[];
  pubs2!: Produit[];
  best!: Produit[];
  sliders: Slider[] = [];
  constructor(private produitService: ProduitService,private imagePros: ImageProsService,private route: ActivatedRoute,public sliderService: SliderService) { }

  ngOnInit(): void {
    this.produitService.listeProduit().pipe(
      map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
      ).subscribe(prods => {
      console.log(prods);
      /* this.allProduits = prods; */
      
      // filter
      this.produits = prods.filter(item => item.trend ===true);
      this.pubs1= prods.filter(item => item.pub1 ===true);
      this.pubs2= prods.filter(item => item.pub2 ===true);
      this.best= prods.filter(item => item.bestoffer ===true);
      });
      this.getall();

      
  }

  getall(){
   
   

    this.sliderService.getAllSlider().subscribe(
      data =>{
        this.sliders=data;
        console.log(this.sliders);
      }
      
    )
   
  }

}
