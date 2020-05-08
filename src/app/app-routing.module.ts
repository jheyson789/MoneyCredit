import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'clientes',component: ClientesComponent},
  {path: 'prestamos', component: PrestamosComponent},
  {path: 'calculadora', component: CalculadoraComponent},
  {path: '**', pathMatch:'full', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
