import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { UserComponent } from './Admin/user/user.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'admin/user', component: UserComponent },
  { path: 'profile', component: ProfileComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
