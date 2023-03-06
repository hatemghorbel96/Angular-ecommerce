import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Role } from '../model/role';
import { User } from '../model/User';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiURL: string = 'http://localhost:8080/produits/users/';
  cons: string = 'http://localhost:8080/produits/users';
  listroleapi: string = 'http://localhost:8080/produits';
  apiRole: string = 'http://localhost:8080/produits/users/addrole';
  apiRoler: string = 'http://localhost:8080/produits/users/removerole';
  constructor(private http : HttpClient,private authService : AuthService) { }

     register( user: User):Observable<User>{
    /*  return this.http.post<Produit>(this.apiURL, prod, httpOptions); // post prod,httpoptions
     } */
     
     return this.http.post<User>('http://localhost:8080/produits/users',user,httpOptions);
     }

     listeUser(): Observable<User[]>{ // return un tableau de type observable
      /*  return this.http.get<Produit[]>(this.apiURL); // get
       } */
       let jwt = this.authService.getToken();
       jwt = "Bearer "+jwt;
       let httpHeaders = new HttpHeaders({"Authorization":jwt})
       return this.http.get<User[]>(this.apiURL+"all",{headers:httpHeaders});
       }

       listeRoles():Observable<Role[]>{
        /*  return this.http.get<Categorie[]>(this.apiURL+"/cat"); */
         /* return this.http.get<CategorieWrapper>(this.apiURLCat);
         } */

         const listrole = `${this.listroleapi}/roles`;
         let jwt = this.authService.getToken();
         jwt = "Bearer "+jwt;
         let httpHeaders = new HttpHeaders({"Authorization":jwt})
         return  this.http.get<Role[]>(listrole,{headers:httpHeaders});
         }

      

        updateStatut(u :User) : Observable<User>
   
        {
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.put<User>(this.apiURL,u, {headers:httpHeaders});
        }


        updatePassInfo(u :User,username:string) : Observable<User>
   
        {
        const listrole = `${this.apiURL}/password/${username}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.put<User>(this.apiURL,u, {headers:httpHeaders});
        }


        updateInfo(u :User,username:string) : Observable<User>
   
        {
        const listrole = `${this.apiURL}/info/${username}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.put<User>(this.apiURL,u, {headers:httpHeaders});
        }

        consulterUser(id: number): Observable<User> {
          /* const url = `${this.apiURL}/${id}`;
          return this.http.get<Produit>(url); // get produit bel id fel parameter
          } */
          const url = `${this.apiURL}${id}`;
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.get<User>(url,{headers:httpHeaders});
          }

          consulterUserbyusername(username: string): Observable<User> {
            /* const url = `${this.apiURL}/${id}`;
            return this.http.get<Produit>(url); // get produit bel id fel parameter
            } */
            const url = `${this.cons}/getUser/${username}`;
            let jwt = this.authService.getToken();
            jwt = "Bearer "+jwt;
            let httpHeaders = new HttpHeaders({"Authorization":jwt})
            return this.http.get<User>(url,{headers:httpHeaders});
            }
    
    
       updateUser(prod :User) : Observable<User>
       
       {
       /* return this.http.put<Produit>(this.apiURL, prod, httpOptions); // put kima post
       } */
       let jwt = this.authService.getToken();
       jwt = "Bearer "+jwt;
       let httpHeaders = new HttpHeaders({"Authorization":jwt})
       return this.http.put<User>(this.apiURL, prod, {headers:httpHeaders});
       }

       addrole(u,username :string,role:string) : Observable<User>
       
       {
       /* return this.http.put<Produit>(this.apiURL, prod, httpOptions); // put kima post
       } */
       const roleapi = `${this.apiRole}/${username}/${role}`;
       let jwt = this.authService.getToken();
       jwt = "Bearer "+jwt;
       let httpHeaders = new HttpHeaders({"Authorization":jwt})
       return this.http.post<User>(roleapi, u, {headers:httpHeaders});
       }

       removerole(u,username :string,role:string) : Observable<User>
       
       {
       /* return this.http.put<Produit>(this.apiURL, prod, httpOptions); // put kima post
       } */
       const roleapi = `${this.apiRoler}/${username}/${role}`;
       let jwt = this.authService.getToken();
       jwt = "Bearer "+jwt;
       let httpHeaders = new HttpHeaders({"Authorization":jwt})
       return this.http.post<User>(roleapi, u, {headers:httpHeaders});
       }

}
