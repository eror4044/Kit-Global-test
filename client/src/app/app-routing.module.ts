import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

const routes: Routes = [
  {
    path:'',component:AuthLayoutComponent,children:[
        {path:'',redirectTo:'/login', pathMatch:'full'},
        {path:'login',component:LoginComponent},
        {path:'adminLogin',component:AdminLoginComponent},
        {path:'register',component:RegistrationComponent},
        {path:'restorePassword',component:RestorePasswordComponent}

    ]
},
{path:'user', component:UserPanelComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
