import { Address } from "./address";
import { OrderItem } from "./order-item";
import { User } from "./User";

export class Order {
    id!: number;
    totalQuantity!: number;
    totalPrice!: number;
    dateCreated! : Date;
    orderTrackingNumber!: number;
    status!: number;
    user!: User;
    orderItems!: OrderItem[];
    shippingAddress!: Address;
    billingAddress!: Address;

}
