import { Produit } from "./Produit";

export class Categorie {
    idCategory! : number; // ou idCat? : number;
    nomCategory! : string; 
    description! :string;
    produits! :Produit[];
    }

    // pooint d integorgoaction ma3neha champ ynejem ykoun null , nullable=true