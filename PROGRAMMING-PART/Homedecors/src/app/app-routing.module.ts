import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CartlistComponent } from './cartlist/cartlist.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { WishListComponent } from './wish-list/wish-list.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "adminlogin", component: AdminLoginComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "wishlist", component: WishListComponent },
  { path: "cartlist", component: CartlistComponent },
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
