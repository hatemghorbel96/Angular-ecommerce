import { Produit } from './../model/Produit';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../service/produit.service';
import { CartService } from '../service/cart.service';
import { CartItem } from '../model/cart-item';
import { Comment } from 'src/app/model/comment';
import { CommentService } from '../service/comment.service';
import { AuthService } from '../service/auth.service';
import { SumPipe } from '../sum-pipe';
import { BehaviorSubject, map } from 'rxjs';
import { ImageProsService } from '../service/image-pros.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',

})

export class ProductDetailsComponent implements OnInit {



  produit!: Produit;
  comments: Comment[] = [];
  newComment = new Comment();
  currentComment = new Comment();
  value1 = 0;
  value2!: number;
  valueid!: number;
  successComment!: number;
  selectedProductIndex = 0;
 


  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  
  constructor(private produitService: ProduitService,private route: ActivatedRoute,
    private cartService: CartService,private commentservice: CommentService,public authService: AuthService,private router : Router,private imagePros: ImageProsService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(()=>{
      this.commentsdetails();
    })
      
   
    this.route.paramMap.subscribe(()=>{
      this.productdetails();
    })

    this.commentservice.getcommentbyid(this.valueid).
    subscribe( com =>{ this.currentComment = com;
    console.log(com)
      
    } ) ;

    
     
   
  }

  



  productdetails(){
    // get the id from parameter and covert string to number using the + symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.produitService.consulterProduit(theProductId).pipe(
      map((product:Produit)=> this.imagePros.createImage(product))
      ).subscribe(
      data => {
        this.produit = data;
      }
    )

   
  }
  changeindex(index){
    this.selectedProductIndex= index;
  }

/*   scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  } */

  addComment(){
    this.isLoading.next(true);
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.commentservice.addcomment(this.newComment,theProductId,this.authService.loggedUser).subscribe(
      (data) =>{
        console.log(data);
        this.commentsdetails();
        this.successComment= 1
        this.isLoading.next(false);
      }),     
      err => {
        console.log("Error");
      }       
  }

  getcomment(id: number){
    
    const idcom: number = id;
    console.log(idcom)
    this.valueid= idcom;

    this.commentservice.getcommentbyid(this.valueid).
    subscribe( com =>{ this.currentComment = com;
    console.log(com)
      
    } ) ;
          
  }

  updateComment(){

    
      
      const idcomment: number = this.valueid;  

    this.commentservice.updatecomment(this.currentComment,idcomment).subscribe(
      (data) =>{console.log(data);
        this.commentsdetails();
        this.successComment= 2
      }),     
      err => {
        console.log("Error");
      }       
  }

  supprimerComment(c: Comment){
         
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.commentservice.supprimerComment(c.idComment).subscribe(() => {
    console.log("comment supprimé");
    this.commentsdetails();
    this.successComment= 3
    });
    }

 /*  reloadCurrentPage() {
     window.location.reload(); 
     this.router.navigate([this.router.url]) 
   } */

  commentsdetails(){
    // get the id from parameter and covert string to number using the + symbol
    
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.commentservice.consulterComments(theProductId).subscribe(
      data => {
        this.comments = data;
      }      
    )
    
  }

 
 

  addToCart(){
    console.log(`Adding to cart: ${this.produit.nomProduit}, ${this.produit.prixProduit}`);

    // TODO ... do the real work
    const theCartItem = new CartItem(this.produit);

    this.cartService.addToCart(theCartItem);
  }

  sortBy() {
    
    if (this.value1==1){
      return this.comments.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
    else if(this.value1==2) {
      return this.comments.sort((b, a) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }

    else if(this.value1==3) {
      return this.comments.sort((a, b) => new Date(b.rating).getTime() - new Date(a.rating).getTime());
    }

    else if(this.value1==4) {
      return this.comments.sort((b, a) => new Date(b.rating).getTime() - new Date(a.rating).getTime());
    }

   

    else  {
      return this.comments.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }

    
    
  }

 

}


