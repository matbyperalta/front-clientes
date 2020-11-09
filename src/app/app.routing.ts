import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//importo los componentes a los que les quiero hacer una pagina exclisiva
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ConsignarComponent } from './components/consignar/consignar.component';
import { RetirarComponent } from './components/retirar/retirar.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ModificarClienteComponent } from './components/modificar-cliente/modificar-cliente.component';
import { SearchClienteComponent } from './components/search-cliente/search-cliente.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'crearcliente', component: CrearClienteComponent},
    {path: 'consignar', component: ConsignarComponent} ,
    {path: 'retirar', component: RetirarComponent},
    {path: 'home/modificar-cliente/:id', component: ModificarClienteComponent},
    {path: 'searchcliente/modificar-cliente/:id', component: ModificarClienteComponent},
    {path: 'searchcliente', component: SearchClienteComponent},
    {path: '**', component: ErrorComponent}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);