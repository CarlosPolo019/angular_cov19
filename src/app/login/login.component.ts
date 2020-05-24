import { Component, OnInit,Input } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';
import { LoginApiService } from 'src/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  registerForm:FormGroup;

  @Input() successMessage:any;
    @Input() errorMessage:any;


  constructor(private formBuilder: FormBuilder,private router: Router ,private apiService: LoginApiService) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit(){
    
    let form = this.registerForm.value;
    console.log(form);

   this.apiService.loggearAdministrador(this.registerForm.value)
    .subscribe( data => {console.log(data);
    
      this.router.navigate(['dashboard/']);
  }, err => {
    console.log(err);
    this.errorMessage = err.message;
    this.successMessage = "";
  })

}
   /* this.apiService.crearPaciente(this.addForm.value)
    .subscribe( data => {
      this.router.navigate(['paciente/listar']);
    });
  }
*/

}
