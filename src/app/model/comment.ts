import { Produit } from "./Produit";
import { User } from "./User";

export class Comment {
    idComment!: number;
    rating!: number;
    content!: string;
    dateCreation!: Date;
    updatedAt!: Date;
    user! : User;
    Produit!: Produit;
}
