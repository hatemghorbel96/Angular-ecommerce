import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../model/Categorie';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})

export class CategorieService {

  apiURL: string = 'http://localhost:8080/produits/api/cat';
 

  constructor(private http : HttpClient,private authService : AuthService) { }

  listeCategorie(): Observable<Categorie[]>{ // return un tableau de type observable
    /* return this.http.get<Categorie[]>(this.apiURL); // get */
    
      return this.http.get<Categorie[]>(this.apiURL+"/all",httpOptions);
    }

 ajouterCategorie( cat: Categorie):Observable<Categorie>{
    /* return this.http.post<Categorie>(this.apiURL, cat, httpOptions); // post prod,httpoptions */
    let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.post<Categorie>(this.apiURL, cat, {headers:httpHeaders});
    }

 supprimerCategorie(id : number) {
   /*  const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions); // delete url,httpoption fel parameter */
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});
    }

 consulterCategorie(id: number): Observable<Categorie> {
    /* const url = `${this.apiURL}/${id}`;
    return this.http.get<Categorie>(url); // get produit bel id fel parameter */
    const url = `${this.apiURL}/${id}`;
      
      return this.http.get<Categorie>(url,httpOptions);
    }


 updateCategorie(cat :Categorie) : Observable<Categorie>
 
 {
 /* return this.http.put<Categorie>(this.apiURL, cat, httpOptions); // put kima post */
 let jwt = this.authService.getToken();
 jwt = "Bearer "+jwt;
 let httpHeaders = new HttpHeaders({"Authorization":jwt})
 return this.http.put<Categorie>(this.apiURL, cat, {headers:httpHeaders});
 }

}
