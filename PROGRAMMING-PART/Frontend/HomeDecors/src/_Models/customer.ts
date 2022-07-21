export class Customer {

    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public role: string = "ROLE_USER";
    public customerWishlist!: WishList[];
    public customerCartList!: CartList[];

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