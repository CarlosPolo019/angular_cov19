
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.css']
})

export class TriageComponent implements OnInit{
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  diagnosticoFormGroup: FormGroup;

  options = [
    { name: "Carlos Escorcia", value: 1 },
];
 

  select1 = [
    { name: "Tos", value: 1},
    { name: "Escalofríos", value: 2},
    { name: "Temblores y escalofríos que no ceden", value: 3 },
    { name: "Dificultad para respirar (sentir que le falta el aire) Fiebre", value: 4 },
    { name: "Dolor muscular", value: 4},
    { name: "No", value: 5}];
 
  select2 = [
    { name: "Tos", value: 1},
    { name: "Escalofríos", value: 2},
    { name: "Temblores y escalofríos que no ceden", value: 3 },
    { name: "Dificultad para respirar (sentir que le falta el aire) Fiebre", value: 4 },
    { name: "Dolor muscular", value: 4 },
    { name: "No", value: 5}];


  constructor(private _formBuilder: FormBuilder) {}
 
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      consulta: ['', Validators.required],
      paciente: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      sintoma1: ['', Validators.required],
      sintoma2: ['', Validators.required]
    });
    this.diagnosticoFormGroup = this._formBuilder.group({
      diagnostico: ['', Validators.required]
    });

  }

  onSubmit(){
    
    let form = this.firstFormGroup.value;
    let form2 = this.secondFormGroup.value;
    let form3 = this.diagnosticoFormGroup.value;


    console.log(form);
    console.log(form2["sintoma2"]);
    console.log(form3);
  
/*
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

    */
  }


}