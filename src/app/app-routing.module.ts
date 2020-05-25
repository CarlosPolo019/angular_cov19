import { EditarPacienteComponent } from './paciente/editar-paciente/editar-paciente.component';
import { AgregarPacienteComponent } from './paciente/agregar-paciente/agregar-paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPacienteComponent } from './paciente/list-paciente/list-paciente.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgregarDoctorComponent } from './doctor/agregar-doctor/agregar-doctor.component';
import { EditarDoctorComponent } from './doctor/editar-doctor/editar-doctor.component';
import { ListDoctorComponent } from './doctor/list-doctor/list-doctor.component';
import { TriageComponent } from './triage/triage.component';


const routes: Routes = [

  { path: "doctor/listar", component: ListDoctorComponent },
  { path: "doctor/agregar", component: AgregarDoctorComponent },
  { path: "doctor/editar", component: EditarDoctorComponent },
  { path: "paciente/listar", component: ListPacienteComponent },
  { path: "paciente/agregar", component: AgregarPacienteComponent },
  { path: "paciente/editar", component: EditarPacienteComponent },
  { path: "triage", component: TriageComponent },  
  { path: "dashboard", component: DashboardComponent },
  { path: "", component: LoginComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

