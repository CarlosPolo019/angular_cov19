import { DoctoresApiService } from './../../../services/doctores.service';
import { Doctores } from 'src/model/doctores.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {

  doctores: Doctores[];

  constructor(private _doctorService:DoctoresApiService,private router : Router) { }

  ngOnInit(){
    this.listarDoctores();
  }

  listarDoctores(){
    this._doctorService.getDoctores().subscribe((data:Doctores[]) => {
      
      this.doctores = data;
      console.log(this.doctores);
  });
  }

  eliminar(doctor:Doctores):void {
   
    this._doctorService.borrarDoctor(doctor.id)
    .subscribe(data => {      
      this.ngOnInit();
    },err => {
    console.log(err);
    alert(err.statusText);
  });

  }

  agregarDoctor(){
    this.router.navigate(['doctor/agregar']);
  }

  
  editar(doctor:Doctores) {
    window.localStorage.setItem("editDoctorId", doctor.id.toString());
    this.router.navigate(['doctor/editar']);
  }

}
