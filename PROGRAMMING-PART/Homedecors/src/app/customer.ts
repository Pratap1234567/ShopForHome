import { CartList } from "./cart-list";
import { WishList } from "./wish-list";

export class Customer {
    public id!: number;
    public email!: string;
    public password!: string;
    public username!: string;
    public role: string = "ROLE_USER";
    public phone!: string;
    public customerWishlist!: WishList;
    public customerCartList!: CartList;
    constructor() {

    }
}
