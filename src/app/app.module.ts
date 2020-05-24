import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPacienteComponent } from './paciente/list-paciente/list-paciente.component';
import { AgregarPacienteComponent } from './paciente/agregar-paciente/agregar-paciente.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarPacienteComponent } from './paciente/editar-paciente/editar-paciente.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalComponent } from './hospital/hospital.component';
import { AgregarDoctorComponent } from './doctor/agregar-doctor/agregar-doctor.component';
import { EditarDoctorComponent } from './doctor/editar-doctor/editar-doctor.component';
import { ListDoctorComponent } from './doctor/list-doctor/list-doctor.component';


@NgModule({
  declarations: [
    AppComponent,
    ListPacienteComponent,
    AgregarPacienteComponent,
    EditarPacienteComponent,
    LoginComponent,
    DashboardComponent,
    HospitalComponent,
    AgregarDoctorComponent,
    EditarDoctorComponent,
    ListDoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
