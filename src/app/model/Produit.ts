import { Categorie } from "./Categorie";
import { User } from "./User";
import { Comment } from "./comment";
import { FileHandle } from "./file-handle.model";

export class Produit {
    idProduit! : number;
    nomProduit! : string;
    prixProduit! : number;
    dateCreation! : Date;
    imgurl! : string;
    categorie! : Categorie;
    favorits : User[]= [];
    comments: Comment[]= [];
    promo!: number;
    productImages : FileHandle[]= [];
    trend! : boolean;
    pub1! : boolean;
    pub2! : boolean;
    bestoffer!: boolean;
   
}