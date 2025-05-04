import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { authGuard } from './services/auth.guard';
import { loginGuard } from './services/login.guard';
import { SmartphoneComponent } from './pages/smartphone/smartphone.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [authGuard] },
  { path: 'edit-product', component: EditProductComponent, canActivate: [authGuard] },
  { path: 'smartphone', component: SmartphoneComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loginGuard] },
];
