import { DashbordComponent } from './components/dashbord/dashbord.component';
import { EditSliderComponent } from './component/edit-slider/edit-slider.component';
import { ProduitPromoComponent } from './component/produit-promo/produit-promo.component';
import { ListSliderComponent } from './component/list-slider/list-slider.component';
import { PromotionComponent } from './component/promotion/promotion.component';
import { ListPromoComponent } from './component/list-promo/list-promo.component';
import { AdminDashComponent } from './component/admin-dash/admin-dash.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { CategoriesComponent } from './categorie/categories/categories.component';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';
import { RechercheParCategorieComponent } from './recherche-par-categorie/recherche-par-categorie.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ProduitGuard } from './produit.guard';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminProdComponent } from './admin-prod/admin-prod.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { OrdersComponent } from './component/orders/orders.component';
import { OrdersDetailsComponent } from './component/orders-details/orders-details.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { MyOrdersDetailsComponent } from './component/my-orders-details/my-orders-details.component';
import { AddroleComponent } from './component/addrole/addrole.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ChangeInfoComponent } from './component/change-info/change-info.component';
import { AddSliderComponent } from './component/add-slider/add-slider.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {path: "dashbord", component : DashbordComponent},
  {path: "updateSlider/:id", component : EditSliderComponent},
  {path: "produitpromo", component : ProduitPromoComponent},
  {path: "home", component : HomeComponent},
  {path: "listSlider", component : ListSliderComponent},
  {path: "addslider", component : AddSliderComponent},
  {path: "info/:username", component : ChangeInfoComponent},
  {path: "password/:username", component : ChangePasswordComponent},
  {path: "promo/:id", component : PromotionComponent},
  {path: "listpromo", component : ListPromoComponent},
  {path: "admin", component : AdminDashComponent},
  {path: "addrole/:id", component : AddroleComponent},
  {path: "myorders-details/:id", component : MyOrdersDetailsComponent},
  {path: "myorders/:username", component : MyOrdersComponent},
  {path: "orderdetails/:id", component : OrdersDetailsComponent},
  {path:'orders',component: OrdersComponent},
  {path:'checkout',component: CheckoutComponent},
  {path:'searchprice/:max/:min',component: ProduitsComponent},
  {path:'search/:keyword',component: ProduitsComponent},
  {path:'category/:id',component: ProduitsComponent},
  {path: "cart-details", component : CartDetailsComponent},
  {path: "productdetails/:id", component : ProductDetailsComponent},
  {path: "admin-prod", component : AdminProdComponent},
  {path: "users/:id", component : EditUserComponent},
  {path: "users", component : UsersComponent},
  {path: "register", component : RegisterComponent},
{path: "produits", component : ProduitsComponent},
{path: "add-produit", component : AddProduitComponent, canActivate:[ProduitGuard]},
{path: "updateProduit/:id", component : UpdateProduitComponent},
{ path: "", redirectTo: "produits", pathMatch: "full" }, // fel ken ma fama chay redirect lel /produits
{path: "add-categorie", component : AddCategorieComponent}  ,
{path: "categories", component : CategoriesComponent},
{path: "updateCategorie/:id", component : UpdateCategorieComponent},
{path: "rechercheParCategorie", component : RechercheParCategorieComponent},
{path: "rechercheParNom", component : RechercheParNomComponent},
{path: "listeCategories", component : ListeCategoriesComponent},
{path: 'login', component: LoginComponent},
{path: 'app-forbidden', component: ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
