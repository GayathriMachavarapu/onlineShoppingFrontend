import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RegisterComponent } from './register/register.component';
import { AuthsGuard } from './Auth_service/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { ProductResolverService } from './_Services/product-resolver.service';
import { ProductViewComponent } from './product-view/product-view.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './_Services/buy-product-resolver.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpdateUserComponent } from './update-user/update-user.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent,canActivate:[AuthsGuard],data:{roles:['Admin']} },
  { path: 'user', component: UserComponent ,canActivate:[AuthsGuard],data:{roles:['User']}},
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {path: 'register',component:RegisterComponent},
  {path:'addNewProduct',component:AddNewProductComponent ,canActivate:[AuthsGuard],data:{roles:['Admin']},
  resolve:{
    p:ProductResolverService
  }
},
  {path:'showProductsDetails',component:ShowProductsComponent,canActivate:[AuthsGuard],data:{roles:['Admin']}},
  {path:'productViewDetails',component:ProductViewComponent,
resolve:{
  p:ProductResolverService
}
},
{ path: "buyProduct",
component: BuyProductComponent,canActivate: [AuthsGuard],data: { roles: ['User'] },
resolve: {
  productDetails: BuyProductResolverService,},
},
{path:"orderConfirm",component:OrderConfirmationComponent,canActivate: [AuthsGuard],data: { roles: ['User'] }},
{path: "cart",component: CartComponent,canActivate: [AuthsGuard],data: { roles: ['User'] },},
{path:"myOrders",component:MyOrdersComponent,canActivate: [AuthsGuard],data: { roles: ['User'] }},
{path:"allOrders",component:AllOrdersComponent,canActivate: [AuthsGuard],data: { roles: ['Admin'] }},
{path:"myProfile",component:MyProfileComponent,canActivate: [AuthsGuard],data: { roles: ['User'] }},
{path:"updateProfile",component:UpdateUserComponent,canActivate: [AuthsGuard],data: { roles: ['User'] }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
