import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  
  storage: Storage = sessionStorage;
  // storage: Storage = localStorage;

  constructor() {

     // read data from storage
     let data = JSON.parse(this.storage.getItem('cartItems')!);

     if (data != null) {
       this.cartItems = data;
       
       // compute totals based on the data that is read from storage
       this.computeCartTotals();
     }



   }

  addToCart(cart: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem!: CartItem;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      for (let c of this.cartItems) {
        if (c.id === cart.id) {
          existingCartItem = c;
          break;
        }
      }

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(cart);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }



  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      if (currentCartItem.promo==null)
      {
        totalPriceValue += currentCartItem.quantity * currentCartItem.prixProduit;
      }
      totalPriceValue += currentCartItem.quantity * currentCartItem.promo;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

    //persist cart data
    this.persistCartItems();
  }


  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {

      if (tempCartItem.promo==null)
      {
        const subTotalPrice = tempCartItem.quantity * tempCartItem.prixProduit;
      }
      const subTotalPrice = tempCartItem.quantity * tempCartItem.promo;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.prixProduit}, subTotalPrice=${subTotalPrice}`);

    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {

    // get index of item in the array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id );

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}
