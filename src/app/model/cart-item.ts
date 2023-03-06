import { OperatorFunction } from "rxjs";
import { FileHandle } from "./file-handle.model";
import { Produit } from "./Produit";

export class CartItem {
    pipe(arg0: OperatorFunction<Produit[], Produit[]>) {
      throw new Error('Method not implemented.');
    }
    id: number;
    name: string;
    prixProduit: number;
    imgurl: string;
    quantity: number;
    promo:number;
    productImages : FileHandle[];

    constructor(product: Produit) {
        this.id = product.idProduit;
        this.name = product.nomProduit;
        this.prixProduit = product.prixProduit;
        this.imgurl = product.imgurl;
        this.promo = product.promo;
        this.quantity = 1;
        this.productImages= product.productImages;
    }
}