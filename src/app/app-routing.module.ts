import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { EditarComponent } from './components/editar/editar.component';
import { PagoComponent } from './components/pago/pago.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'clientes',component: ClientesComponent},
  {path: 'calculadora', component: CalculadoraComponent},
  {path: 'editar/:id', component: EditarComponent},
  {path: 'pago/:id', component: PagoComponent},
  {path: '**', pathMatch:'full', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
