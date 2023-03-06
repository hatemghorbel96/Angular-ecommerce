import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Slider } from 'src/app/model/slider';
import { SliderService } from 'src/app/service/slider.service';

@Component({
  selector: 'app-edit-slider',
  templateUrl: './edit-slider.component.html',
  
})
export class EditSliderComponent implements OnInit {
  currentSlider = new Slider();
  valueid!: number;
  constructor(private activatedRoute: ActivatedRoute,public sliderService: SliderService,private router : Router) { }

  ngOnInit(): void {

    this.sliderService.getSlider(this.activatedRoute.snapshot.params['id']).
    subscribe( s =>{ this.currentSlider = s;
    
    } ) ;

  }


  updateSlider(){

    
    let formData = new FormData();
       formData.append('titre',this.currentSlider.titre);
       formData.append('description',this.currentSlider.description);
       formData.append('url',this.currentSlider.url);
       
       const sliderid: number = +this.activatedRoute.snapshot.paramMap.get('id')!;
       this.sliderService.updateSliderinfo(formData,sliderid).subscribe(
         s => {console.log(s); // just pour afficher dans le console
      
       });
       
       }
   
   
    
   
   
       img:any;
   
       selectImage(event){
         
         this.img = event.target.files[0];
         console.log(this.img);
       }


       getslider(id: number){
    
        const idcom: number = id;
        console.log(idcom)
        this.valueid= idcom;
    
        this.sliderService.getSlider(this.valueid).
        subscribe( com =>{ this.currentSlider = com;
        console.log(com)
          
        } ) ;
              
      }
   

}
