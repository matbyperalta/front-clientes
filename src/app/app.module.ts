import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ConsignarComponent } from './components/consignar/consignar.component';
import { RetirarComponent } from './components/retirar/retirar.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ModificarClienteComponent } from './components/modificar-cliente/modificar-cliente.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { SearchClienteComponent } from './components/search-cliente/search-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    SidebarComponent,
    FooterComponent,
    CrearClienteComponent,
    ConsignarComponent,
    RetirarComponent,
    HomeComponent,
    ErrorComponent,
    ModificarClienteComponent,
    ClienteComponent,
    SearchClienteComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
