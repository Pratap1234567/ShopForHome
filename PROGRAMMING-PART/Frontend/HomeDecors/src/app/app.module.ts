import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';
import { RegisterComponent } from './register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CopyRightComponent } from './copy-right/copy-right.component'
import { AuthGuard } from 'src/_auth/auth.guard';
import { AuthInterceptor } from 'src/_auth/auth.interceptor';
import { RestService } from 'src/_Services/rest.service';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UserListComponent } from './user-list/user-list.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartlistComponent } from './cartlist/cartlist.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    LoginComponent,
    AdminDashBoardComponent,
    UserDashBoardComponent,
    RegisterComponent,
    ContactUsComponent,
    CopyRightComponent,
    ForbiddenComponent,
    UserListComponent,
    WishlistComponent,
    CartlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
