import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';
import { TriagesService } from 'src/services/triages.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nombre:string;
  arrayConsultas: [];

    constructor(private formBuilder: FormBuilder,private router: Router,private apiService: TriagesService) { }

   select1 = [];
 

  ngOnInit(): void {
    this.getConsultas(11);
  	this.nombre = "Carlos";

  }

getConsultas(id_doctor){
  this.apiService.getConsultas(id_doctor)
    .subscribe( data => {
      this.select1.push(data)
      //data.map( (o)=> this.select1.push({name: o.id_doctor , value: o.id}));
    },err => {
    console.log(err);
    alert(err.statusText);
  });

}

}
