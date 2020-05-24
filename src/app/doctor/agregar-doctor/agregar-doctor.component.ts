import { DoctoresApiService } from './../../../services/doctores.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-doctor',
  templateUrl: './agregar-doctor.component.html',
  styleUrls: ['./agregar-doctor.component.css']
})
export class AgregarDoctorComponent implements OnInit {

  
  addForm:FormGroup;
  hospitales = [];
  options = [
    { name: "O-", value: 1 },
    { name: "O+", value: 2 },
    { name: "A-", value: 3 },
    { name: "A+", value: 4 },
    { name: "B-", value: 5 },
    { name: "B+", value: 6 },
    { name: "AB-", value: 7 },
    { name: "AB+", value: 8 }
];

  constructor(private formBuilder: FormBuilder,private router: Router,private apiService: DoctoresApiService) { }

  ngOnInit(): void {

    this.getHospitales();

    this.addForm = this.formBuilder.group({
      id: [],
      primer_apellido: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_apellido: ['', Validators.required],
      segundo_nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      tipo_sangre: ['', Validators.required],
      id_hospital: ['', Validators.required],
      experiencia: ['', Validators.required],
      correo: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required]
    });

  }


getHospitales(){
  this.apiService.getHospitales()
    .subscribe( data => {
      data.map( (o)=> this.hospitales.push({name: o.nombre , value: o.id}));
    },err => {
    console.log(err);
    alert(err.statusText);
  });

}

  regresar(){

              this.router.navigate(['doctor/listar']);

  }

  onSubmit(){
    
    let form = this.addForm.value;
    console.log(form);

  

    this.apiService.crearDoctor(this.addForm.value)
    .subscribe( data => {
      if(data["resultado"] == "OK"){
        
            alert(data["mensaje"]);
          this.router.navigate(['doctor/listar']);
        }
    },err => {
    console.log(err);
    alert(err.statusText);
  });

    
  }


}

