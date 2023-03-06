import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Slider } from 'src/app/model/slider';
import { SliderService } from 'src/app/service/slider.service';

@Component({
  selector: 'app-list-slider',
  templateUrl: './list-slider.component.html',
  
})
export class ListSliderComponent implements OnInit {

  sliders: Slider[] = [];

  currentSlider = new Slider();
  valueid!: number;
  successSlider!: number;
  constructor(public sliderService: SliderService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(()=>{
      this.getall()
    })
    this.sliders;
    
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


  updateImage(){

    
      
    const ids: number = this.valueid;  
    let formData = new FormData();
    formData.append('titre',this.currentSlider.titre);
    formData.append('description',this.currentSlider.description);
    formData.append('url',this.currentSlider.url);
    formData.append('img',this.img);
    
  this.sliderService.updateSliderImage(formData,ids).subscribe(
    
    (data) =>{console.log(data);
      this.getall();
      this.successSlider= 2
    }), 
        
    err => {
      console.log("Error");
      this.getall();
      this.successSlider= 2
    }  
     
}

img:any;
   
       selectImage(event){
         
         this.img = event.target.files[0];
         console.log(this.img);
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
