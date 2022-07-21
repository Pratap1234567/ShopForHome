import { Address } from "./address";



export class Customer {

    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public role: string = "ROLE_USER";
    public customerWishlist!: WishList[];
    public customerCartList!: CartList[];
    public deliveryAddress!: Address;

    constructor() {

    }
}

export interface WishList {
    id: number;
    productID: number;
}
export interface CartList {
    id: number;
    productID: number;
}
// export interface Address {
//     id: number;
//     houseno: number;
//     address: string;
//     landmark: string;
//     state: string;
//     pincode: string;
//     country: string;
//     mobile: string;
// }
