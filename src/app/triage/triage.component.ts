
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { TriagesService } from 'src/services/triages.service';


@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.css']
})

export class TriageComponent implements OnInit{
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  diagnosticoFormGroup: FormGroup;
  medicamentosFormGroup: FormGroup;

  options = [];
 

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


    constructor(private _formBuilder: FormBuilder,private router: Router,private apiService: TriagesService) { }
 
  ngOnInit() {
    this.getPaciente();
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
    this.medicamentosFormGroup = this._formBuilder.group({
      medicamentos: ['', Validators.required]
    });


  }


  getPaciente(){

  this.apiService.getPacientes().subscribe( data => {
    console.log(data)
        data.map( (o)=> this.options.push({name: o.nombre , value: o.id}));
    },err => {
    console.log(err);
    alert(err.statusText);
  });   
}


  onSubmit(){
    


    let form = this.firstFormGroup.value;
    let form2 = this.secondFormGroup.value;
    let form3 = this.diagnosticoFormGroup.value;
    let form4 = this.medicamentosFormGroup.value;
    var result_cov = "";

if (form2["sintoma2"] == 5 ||  form2["sintoma1"] == 5) {

result_cov = "NO"
}else{
result_cov = "SI"
}

     let obj =   {id: "",id_paciente: form["paciente"], motivo_consulta: form["consulta"], resultado_cov: result_cov,
                          diagnostico:  form3["diagnostico"], medicamento: form4["medicamentos"], 
                          id_doctor: window.localStorage.getItem("id_doctor")}


    this.apiService.crearTriage(obj)
    .subscribe( data => {
      if(data["resultado"] == "OK"){
        
            alert(data["mensaje"]);
          this.router.navigate(['dashboard']);
        }
    },err => {
    console.log(err);
    alert(err.statusText);
  });

  
  }


}