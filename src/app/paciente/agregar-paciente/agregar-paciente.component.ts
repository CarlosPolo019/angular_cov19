import { PacienteApiService } from './../../../services/pacientes.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';



@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css']
})
export class AgregarPacienteComponent implements OnInit {

  addForm:FormGroup;
  
  options = [
    { name: "SELECCIONE SU EPS", value: 0 }, 
    { name: "SURA", value: 1 },
    { name: "COOMEVA", value: 2 },
    { name: "SUSALUD", value: 1 },
    { name: "CAFESALUD", value: 2 },
    { name: "VIVA1A", value: 2 }
  ];

  constructor(private formBuilder: FormBuilder,private router: Router,private apiService: PacienteApiService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [],
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

  }

  regresar(){

              this.router.navigate(['paciente/listar']);

  }

  onSubmit(){
    
    let form = this.addForm.value;
    console.log(form);

    if (form["eps"] == "SELECCIONE SU EPS") {
      alert("Debe seleccionar una EPS");

    }else{

      this.apiService.crearPaciente(this.addForm.value)
    .subscribe( data => {
      if(data["resultado"] == "OK"){
        
          this.router.navigate(['paciente/listar']);
        }
    },err => {
    console.log(err);
    alert(err.statusText);
  });

    }

    
  }

}
