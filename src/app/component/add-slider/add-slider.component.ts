import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/model/slider';
import { SliderService } from 'src/app/service/slider.service';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
 
})
export class AddSliderComponent implements OnInit {
  //preview img
  imgURL: any;public imagePath;

  newSlider =  new Slider();
  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
  }

  
  addSlider(){

    
 let formData = new FormData();
    formData.append('titre',this.newSlider.titre);
    formData.append('description',this.newSlider.description);
    formData.append('url',this.newSlider.url);
    formData.append('img',this.img);
    
    this.sliderService.ajouterSlider(formData).subscribe(
      s => {console.log(s); // just pour afficher dans le console
    /* this.router.navigate(['admin-prod']); */
    });
    }


 


    img:any;

    selectImage(event){
      
      this.img = event.target.files[0];
      console.log(this.img);
      var reader = new FileReader();


      // preview img
      this.imagePath = this.img;
      reader.readAsDataURL(this.img);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }

   

   


   
   
   

    

}
