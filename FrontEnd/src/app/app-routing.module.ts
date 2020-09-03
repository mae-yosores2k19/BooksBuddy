import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  {path : '',component:WelcomeComponent},
  {path: 'notFound',component:ErrorComponent},
  {path : 'form',component:FormComponent},
  {path : 'list',component:ListComponent},
  {path : 'welcome',component:WelcomeComponent},
  {path:'**',redirectTo:'/notFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
