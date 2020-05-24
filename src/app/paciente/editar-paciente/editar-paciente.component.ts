import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PacienteApiService } from 'src/services/pacientes.service';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {
  
  editForm : FormGroup;
  paciente : string;

 options = [
    { name: "SELECCIONE SU EPS", value: 0 }, 
    { name: "SURA", value: 1 },
    { name: "COOMEVA", value: 2 },
    { name: "SUSALUD", value: 1 },
    { name: "CAFESALUD", value: 2 },
    { name: "VIVA1A", value: 2 }
  ];

  constructor(private formBuilder:FormBuilder,private router:Router,private apiService:PacienteApiService) { }


  ngOnInit(): void {
    
    let pacienteId = window.localStorage.getItem("editPacienteId");
this.paciente=pacienteId;
    this.editForm = this.formBuilder.group({
      id: [''],
      primer_apellido: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_apellido: ['', Validators.required],
      segundo_nombre: ['', Validators.required],
      nombre_acom: ['', Validators.required],
      telefono_acom: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      eps: ['', Validators.required]
    });

    if(!pacienteId) {
      alert("Ocurrio un error.")
      this.router.navigate(['']);
      return;
    }else{
      this.cargarDetallePaciente(pacienteId)
    }

  }

  cargarDetallePaciente(id:string){
    
    this.apiService.obtenerPacienteId(id)
    .subscribe( data => {
      
      this.editForm.setValue(data);
    },err => {
    console.log(err);
    alert(err.statusText);
              this.router.navigate(['paciente/listar']);
  });
  }


regresar(){
          this.router.navigate(['paciente/listar']);

}

  onSubmit(){
    
    this.apiService.editarPaciente(this.editForm.value)   
    .subscribe(
      data => {
        if(data["resultado"] == "OK"){
          alert(data["mensaje"]);
          this.router.navigate(['paciente/listar']);
        }
      },err => {
    console.log(err);
    alert(err.statusText);
  });

}

}
