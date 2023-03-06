import { CartItem } from "./cart-item";
import { FileHandle } from "./file-handle.model";

export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: number;
    prodname : string;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imgurl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.prixProduit;
        this.productId = cartItem.id;
        this.prodname = cartItem.name;
    }
}
