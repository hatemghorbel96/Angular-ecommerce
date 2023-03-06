import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Slider } from '../model/slider';
import { AuthService } from './auth.service';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  
};
@Injectable({
  providedIn: 'root'
})

export class SliderService {


  apiURL: string = 'http://localhost:8080/produits/slider';
  host :string = "http://localhost:8080";
  choixmenu : string  = 'A';
  constructor(private http : HttpClient,private authService : AuthService) { }


  ajouterSlider( s: FormData){
    
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Slider>(this.apiURL, s, {headers:httpHeaders});
    }


    getAllSlider(){
      

      return this.http.get<Slider[]>(this.apiURL+"/all",httpOptions);
      }


      getSlider(id:number){
        
        const url = `${this.apiURL}/getSlider/${id}`;

        return this.http.get<Slider>(url,httpOptions);
        }


        updateSliderinfo(s: FormData,id:number) : Observable<Slider>
   
        {
       
        const url = `${this.apiURL}/updateinfo/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.put<Slider>(url, s, {headers:httpHeaders});
        }

        updateSliderImage(s: FormData,id:number) : Observable<any>
   
        {
       
        const url = `${this.apiURL}/updateimage/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        const requestOptions: Object = {
          /* other options here */
          responseType: 'text'
        }
        return this.http.put<Slider>(url, s, requestOptions);
        }

}
