import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { CategoriesComponent } from './categorie/categories/categories.component';
import { RechercheParCategorieComponent } from './recherche-par-categorie/recherche-par-categorie.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminProdComponent } from './admin-prod/admin-prod.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { SearchComponent } from './component/search/search.component';
import { CategoriesListComponent } from './component/categories-list/categories-list.component';
import { FiltrePrixComponent } from './component/filtre-prix/filtre-prix.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { OrdersComponent } from './component/orders/orders.component';
import { OrdersDetailsComponent } from './component/orders-details/orders-details.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { MyMenuComponent } from './component/my-menu/my-menu.component';
import { MyOrdersDetailsComponent } from './component/my-orders-details/my-orders-details.component';
import { SumPipeModule } from './sum-pipe';
import { AddroleComponent } from './component/addrole/addrole.component';
import { AdminDashComponent } from './component/admin-dash/admin-dash.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { SearchSimpleComponent } from './component/search-simple/search-simple.component';
import { PromotionComponent } from './component/promotion/promotion.component';
import { ListPromoComponent } from './component/list-promo/list-promo.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { DragDirective } from './drag.directive';
import { ChangeInfoComponent } from './component/change-info/change-info.component';
import { AddSliderComponent } from './component/add-slider/add-slider.component';
import { ListSliderComponent } from './component/list-slider/list-slider.component';
import { HomeComponent } from './component/home/home.component';
import { ProduitPromoComponent } from './component/produit-promo/produit-promo.component';
import { EditSliderComponent } from './component/edit-slider/edit-slider.component';
import {ImageZoomModule} from 'angular2-image-zoom'
import { CommonModule } from '@angular/common';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { NgChartsModule } from 'ng2-charts';





@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    AddProduitComponent,
    UpdateProduitComponent,
    UpdateCategorieComponent,
    AddCategorieComponent,
    CategoriesComponent,
    RechercheParCategorieComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeCategoriesComponent,
    UpdateCategoryComponent,
    LoginComponent,
    ForbiddenComponent,
    RegisterComponent,
    UsersComponent,
    EditUserComponent,
    AdminProdComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    SearchComponent,
    CategoriesListComponent,
    FiltrePrixComponent,
    CheckoutComponent,
    OrdersComponent,
    OrdersDetailsComponent,
    MyOrdersComponent,
    MyMenuComponent,
    MyOrdersDetailsComponent,
    AddroleComponent,
    AdminDashComponent,
    SearchSimpleComponent,
    PromotionComponent,
    ListPromoComponent,
    ChangePasswordComponent,
    DragDirective,
    ChangeInfoComponent,
    AddSliderComponent,
    ListSliderComponent,
    HomeComponent,
    ProduitPromoComponent,
    EditSliderComponent,
    DashbordComponent,
    
  
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxSliderModule,
    ReactiveFormsModule,
    SumPipeModule,
    AutocompleteLibModule,
    CommonModule, NgxPageScrollModule, NgChartsModule
  ],
  providers: [SumPipeModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
