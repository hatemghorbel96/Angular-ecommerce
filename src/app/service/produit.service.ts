import { Injectable } from '@angular/core';
import { Categorie } from '../model/Categorie';
import { Produit } from '../model/Produit';
import { map,Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../model/CategorieWrapper';
import { AuthService } from './auth.service';
import { ImageProsService } from './image-pros.service';
import { User } from '../model/User';


const httpOptions = {
   headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
   
   /* apiURL: string = 'http://localhost:8080/produits/api'; */
   apiURL: string = 'http://localhost:8080/produits/api';
   apiURLCat: string = 'http://localhost:8080/produits/cat';
   apifav: string = 'http://localhost:8080/produits/api/addfavorit';
   apiremfav: string = 'http://localhost:8080/produits/api/removefavorit';
   apiclient: string = 'http://localhost:8080/produits/stat/get';
   list: any;
  
  constructor(private http : HttpClient,private authService : AuthService,private imagePros: ImageProsService) {
  
    
   }


   bestclients(): Observable<User[]> {
  
    
    
    return this.http.get<User[]>(this.apiclient,httpOptions);
    }

   listeProduit(): Observable<Produit[]>{ // return un tableau de type observable
     /*  return this.http.get<Produit[]>(this.apiURL); // get
      } */
     
      return this.http.get<Produit[]>(this.apiURL+"/all",httpOptions);
      }

      getAll(): Observable<any> {

       
   
        return this.http.get(`${this.apiURL+"/all"}`);
      }

      
      
      /* ajouterProduit( prod: Produit):Observable<Produit>{
    
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.post<Produit>(this.apiURL, prod, {headers:httpHeaders});
      } */


      ajouterProduit( prod: FormData){
    
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.post<Produit>(this.apiURL, prod, {headers:httpHeaders});
        }

      addfavorit(prod: Produit,username: string,id:number):Observable<Produit>{
         /*  return this.http.post<Produit>(this.apiURL, prod, httpOptions); // post prod,httpoptions
          } */
          const url = `${this.apifav}/${username}/${id}`;
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.post<Produit>(url,prod,{headers:httpHeaders});
          }

          removefavorit(prod: Produit,username: string,nomProduit:string){
            /*  return this.http.post<Produit>(this.apiURL, prod, httpOptions); // post prod,httpoptions
             } */
             const url = `${this.apiremfav}/${username}/${nomProduit}`;
             let jwt = this.authService.getToken();
             jwt = "Bearer "+jwt;
             let httpHeaders = new HttpHeaders({"Authorization":jwt})
             return this.http.post(url,prod,{headers:httpHeaders});
             }

   supprimerProduit(id : number) {
     /*  const url = `${this.apiURL}/${id}`;
      return this.http.delete(url, httpOptions); // delete url,httpoption fel parameter
      } */
      const url = `${this.apiURL}/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.delete(url, {headers:httpHeaders});
   }
   consulterProduit(id: number): Observable<Produit> {
      /* const url = `${this.apiURL}/${id}`;
      return this.http.get<Produit>(url); // get produit bel id fel parameter
      } */
      const url = `${this.apiURL}/${id}`;
      
      return this.http.get<Produit>(url,httpOptions);
      }


   updateProduit(prod :Produit) : Observable<Produit>
   
   {
   /* return this.http.put<Produit>(this.apiURL, prod, httpOptions); // put kima post
   } */
   let jwt = this.authService.getToken();
   jwt = "Bearer "+jwt;
   let httpHeaders = new HttpHeaders({"Authorization":jwt})
   return this.http.put<Produit>(this.apiURL, prod, {headers:httpHeaders});
   }

   updatepromo(prod :Produit,id:number) : Observable<Produit>
   
   {
  
   const url = `${this.apiURL}/addpromo/${id}`;
   let jwt = this.authService.getToken();
   jwt = "Bearer "+jwt;
   let httpHeaders = new HttpHeaders({"Authorization":jwt})
   return this.http.put<Produit>(url, prod, {headers:httpHeaders});
   }


   updatedataProduit(prod :FormData) : Observable<Produit>
   
   {
  
   
   let jwt = this.authService.getToken();
   jwt = "Bearer "+jwt;
   let httpHeaders = new HttpHeaders({"Authorization":jwt})
   return this.http.put<Produit>(this.apiURL, prod, {headers:httpHeaders});
   }

   updateProduitByID(prod :Produit,id:number) : Observable<Produit>
   
   {
  
   const url = `${this.apiURL}/trend/${id}`;
   let jwt = this.authService.getToken();
   jwt = "Bearer "+jwt;
   let httpHeaders = new HttpHeaders({"Authorization":jwt})
   return this.http.put<Produit>(url, prod, {headers:httpHeaders});
   }

   pub1(prod :Produit,id:number) : Observable<Produit>
   
   {
  
   const url = `${this.apiURL}/pub1/${id}`;
   let jwt = this.authService.getToken();
   jwt = "Bearer "+jwt;
   let httpHeaders = new HttpHeaders({"Authorization":jwt})
   return this.http.put<Produit>(url, prod, {headers:httpHeaders});
   }

   pub2(prod :Produit,id:number) : Observable<Produit>
   
   {
  
   const url = `${this.apiURL}/pub2/${id}`;
   let jwt = this.authService.getToken();
   jwt = "Bearer "+jwt;
   let httpHeaders = new HttpHeaders({"Authorization":jwt})
   return this.http.put<Produit>(url, prod, {headers:httpHeaders});
   }

   bestoffer(prod :Produit,id:number) : Observable<Produit>
   
   {
  
   const url = `${this.apiURL}/bestoffer/${id}`;
   let jwt = this.authService.getToken();
   jwt = "Bearer "+jwt;
   let httpHeaders = new HttpHeaders({"Authorization":jwt})
   return this.http.put<Produit>(url, prod, {headers:httpHeaders});
   }
  
   listeCategories():Observable<CategorieWrapper>{
     /*  return this.http.get<Categorie[]>(this.apiURL+"/cat"); */
      /* return this.http.get<CategorieWrapper>(this.apiURLCat);
      } */
      
      return  this.http.get<CategorieWrapper>(this.apiURLCat,httpOptions);
      }

        listeCategorie(): Observable<Categorie[]>{ // return un tableau de type observable
    /* return this.http.get<Categorie[]>(this.apiURL); // get */
    
      return this.http.get<Categorie[]>(this.apiURL+"/all",httpOptions);
    }

      rechercherParCategorie(idCat: number):Observable< Produit[]> {
         /* const url = `${this.apiURL}/prodscat/${idCat}`;
         return this.http.get<Produit[]>(url); */
         const url = `${this.apiURL}/prodscat/${idCat}`;
         
         return this.http.get<Produit[]>(url,httpOptions);
         }

      rechercherParNom(nom: string):Observable< Produit[]> {
         const url = `${this.apiURL}/prodsByName/${nom}`;
         return this.http.get<Produit[]>(url);
         }

         ajouterCategorie( cat: Categorie):Observable<Categorie>{
           /*  return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions); */
           let jwt = this.authService.getToken();
           jwt = "Bearer "+jwt;
           let httpHeaders = new HttpHeaders({"Authorization":jwt})
           return this.http.post<Categorie>(this.apiURLCat, cat, {headers:httpHeaders});
            }

            searchProducts(theKeyword: string): Observable<Produit[]> {

              
               const searchUrl = `${this.apiURL}/prodsByName/${theKeyword}`;
           
               return this.http.get<Produit[]>(searchUrl,httpOptions);
             }

             getProductList(thencategoryID : number): Observable<Produit[]> {
               // need to build URL based on category id 
             
               const searchUrl = (`${this.apiURL}/prodscat/${thencategoryID}`);
               
               return this.http.get<Produit[]>(searchUrl,httpOptions);
               
              } 

              searchByPrix(max: string,min : string): Observable<Produit[]> {

              
               const searchUrl = `${this.apiURL}/prodsByPrix/${max}/${min}`;
           
               return this.http.get<Produit[]>(searchUrl,httpOptions);
             }

             getExcelData(){
              return this.http.get<any>(`${this.apiURL}/export/excel`, { responseType: 'arraybuffer' as 'json' });
            }

            

            getDocument() {

              
              this.listeProduit().pipe(
                map((x:Produit[],i)=> x.map((product:Produit)=> this.imagePros.createImage(product)))
                ).subscribe(
                response => {
                  
                  this.list = response;
                }
              );
              
              return {
                pageSize : 'A4',
                pageOrientation : 'landscape',
                footer: function (currentPage, pageCount) {
                  return {
                      table: {
                          body: [
                              [
                                
                                //  { image: 'sampleImage.jpg', alignment: 'center', fit: [400, 400] },
                                  { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'center', style: 'normalText', margin: [400, 20, 50, 0] }
                              ],
                          ]
                      },
                      layout: 'noBorders'
                  };
              },
                content: [
                  {
                 /*    columns: [
                      [{
                        text: this.parametre.libelle,
                        style: 'name'
                      },
                      {
                        text: this.parametre.adresse,
                        style: 'line'
                      },
                      {
                        text: 'Email : ' + this.parametre.email,
                        style: 'line'
                      },
                      {
                        text: 'Tel  : ' + this.parametre.tel,
                        style: 'line',
                      },
                      ],
                    ] */
                    columns: [
                      [
                      
                      {
                        text: 'HG-DEV',
                        style: 'name'
                      },
                      {
                        text: 'route tunis',
                        style: 'line'
                      },
                      {
                        text: 'Email : ' + 'hatemghorbel2121@gmail.com',
                        style: 'line'
                      },
                      {
                        text: 'Tel  : ' + '527679**',
                        style: 'line',
                      },
                      ],
                    ]
                  },
                  {
                    text: 'Liste des Articles',
                    bold: true,
                    fontSize: 20,
                    alignment: 'center',
                    margin: [0, 0, 0, 20]
                  },
          
                       this.getList(this.list),
                       {
               
                       },
          
          
                  {
                    text: 'Signature',
                    style: 'sign',
                    alignment: 'right'
          
                  },
          
                 
          
                ],
          
                styles: {
                  header: {
                    fontSize: 18,
                    bold: true,
          
                    decoration: 'underline'
                  },
                  name: {
                    fontSize: 16,
                    bold: true
                  },
          
                  ligne: {
                    fontSize: 12,
                    bold: true,
                    italics: true
                  },
                  sign: {
                    margin: [0, 50, 0, 10],
                    alignment: 'right',
                    italics: true
                  },
                  tableHeader: {
                    bold: true,
                    fontSize: 15,
                    alignment: 'center'
                  }
                }
              };
            }

            getList(produits: Produit[] ) {
              return {
                table: {
                  widths: [200, 200],
                  body: [
                    [{
                      text: 'Nom Produit',
                      style: 'tableHeader'
                    },
                    {
                      text: 'Prix Produit',
                      style: 'tableHeader'
                    },
                    
                    ],
                   ...produits

                   .map((p)=> {
                      console.log(p)
                      return [p.nomProduit, p.prixProduit];
                    })
                  ]
                }
              };
            }

           

          

}
