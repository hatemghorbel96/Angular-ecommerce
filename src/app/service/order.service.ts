import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiURL: string = 'http://localhost:8080/produits/order';

  constructor(private http : HttpClient,private authService : AuthService) { }

  listeOrder(): Observable<Order[]>{ // return un tableau de type observable
    /*  return this.http.get<Produit[]>(this.apiURL); // get
     } */
     let jwt = this.authService.getToken();
     jwt = "Bearer "+jwt;
     let httpHeaders = new HttpHeaders({"Authorization":jwt})
     return this.http.get<Order[]>(this.apiURL+"/all",{headers:httpHeaders});
     }

     consulterOrder(id: number): Observable<Order> {
      /* const url = `${this.apiURL}/${id}`;
      return this.http.get<Produit>(url); // get produit bel id fel parameter
      } */
      const url = `${this.apiURL}/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<Order>(url,{headers:httpHeaders});
      }

      consulteMyOrder(username: string): Observable<Order[]> {
        /* const url = `${this.apiURL}/${id}`;
        return this.http.get<Produit>(url); // get produit bel id fel parameter
        } */
       /*  const url = `${this.apiURL}/user/${id}`; */
       const url = `${this.apiURL}/user/${username}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<Order[]>(url,{headers:httpHeaders});
        }

      updateOrder(commd :Order,id:number) : Observable<Order>
   
                {
                const url = `${this.apiURL}/update/${id}`;
                let jwt = this.authService.getToken();
                jwt = "Bearer "+jwt;
                let httpHeaders = new HttpHeaders({"Authorization":jwt})
                return this.http.put<Order>(url, commd, {headers:httpHeaders});
                }

}
