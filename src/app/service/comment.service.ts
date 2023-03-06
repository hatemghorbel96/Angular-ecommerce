import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { Comment } from 'src/app/model/comment';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiURLCom: string = 'http://localhost:8080/produits/comment';
  comments: Comment[] = [];
 
 constructor(private http : HttpClient,private authService : AuthService) {
}

addcomment(com: Comment,id:number,username: string):Observable<Comment>{
  /*  return this.http.post<Produit>(this.apiURL, prod, httpOptions); // post prod,httpoptions
   } */
   const url = `${this.apiURLCom}/add/${id}/${username}`;
   let jwt = this.authService.getToken();
   jwt = "Bearer "+jwt;
   let httpHeaders = new HttpHeaders({"Authorization":jwt})
   return this.http.post<Comment>(url,com,{headers:httpHeaders});
   }

   updatecomment(com: Comment,id:number):Observable<Comment>{
    /*  return this.http.post<Produit>(this.apiURL, prod, httpOptions); // post prod,httpoptions
     } */
     const url = `${this.apiURLCom}/update/${id}`;
     let jwt = this.authService.getToken();
     jwt = "Bearer "+jwt;
     let httpHeaders = new HttpHeaders({"Authorization":jwt})
     return this.http.put<Comment>(url,com,{headers:httpHeaders});
     }

   consulterComments(id: number): Observable<Comment[]> {
    /* const url = `${this.apiURL}/${id}`;
    return this.http.get<Produit>(url); // get produit bel id fel parameter
    } */
    const url = `${this.apiURLCom}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Comment[]>(url,{headers:httpHeaders});
    }

    getcommentbyid(id: number): Observable<Comment> {
      /* const url = `${this.apiURL}/${id}`;
      return this.http.get<Produit>(url); // get produit bel id fel parameter
      } */
      const url = `${this.apiURLCom}/get/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<Comment>(url,{headers:httpHeaders});
      }

      supprimerComment(id : number) {
        /*  const url = `${this.apiURL}/${id}`;
         return this.http.delete(url, httpOptions); // delete url,httpoption fel parameter
         } */
         const url = `${this.apiURLCom}/delete/${id}`;
         let jwt = this.authService.getToken();
         jwt = "Bearer "+jwt;
         let httpHeaders = new HttpHeaders({"Authorization":jwt})
         return this.http.delete(url,{headers:httpHeaders});
      }

    

}
