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
import { TriageComponent } from './triage/triage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper'; 
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';


import { CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core'; 

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
    ListDoctorComponent,
    TriageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,MatSelectModule,MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
