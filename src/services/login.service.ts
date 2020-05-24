import { Login } from 'src/model/login.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

 constructor(private http:HttpClient) { }

 
  crearAdministrador(login:Login): Observable<LoginApiService>  {    
    
    return this.http.post<LoginApiService>('http://localhost/backend-angular/login/register.php', JSON.stringify(login));
  }

  loggearAdministrador(login:Login):Observable<LoginApiService>{
    return this.http.post<LoginApiService>('http://localhost/backend-angular/login/session.php',JSON.stringify(login));
  }


}



