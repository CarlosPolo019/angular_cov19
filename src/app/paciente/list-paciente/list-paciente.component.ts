import { PacienteApiService } from './../../../services/pacientes.service';
import { Pacientes } from './../../../model/pacientes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-paciente',
  templateUrl: './list-paciente.component.html',
  styleUrls: ['./list-paciente.component.css']
})
export class ListPacienteComponent implements OnInit {

  pacientes: Pacientes[];

  constructor(private _pacientesService:PacienteApiService,private router : Router) { }

  ngOnInit(){
    this.listarPacientes();
  }

  listarPacientes(){
    this._pacientesService.getPacientes().subscribe((data:Pacientes[]) => {
      
      this.pacientes = data;
      console.log(this.pacientes);
  });
  }

  eliminar(paciente:Pacientes):void {
   
    this._pacientesService.borrarPaciente(paciente.id)
    .subscribe(data => {      
      this.ngOnInit();
    },err => {
    console.log(err);
    alert(err.statusText);
  });

  }

  agregarPaciente(){
    this.router.navigate(['paciente/agregar']);
  }

  
  editar(paciente:Pacientes) {
    window.localStorage.setItem("editPacienteId", paciente.id.toString());
    this.router.navigate(['paciente/editar']);
  }

}
