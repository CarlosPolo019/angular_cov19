import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctores } from 'src/model/doctores.model';
import { Hospitales } from 'src/model/hospitales.model';


@Injectable({
  providedIn: 'root'
})
export class DoctoresApiService {

 constructor(private http:HttpClient) { }

  getDoctores(){
    return this.http.get<Doctores[]>('http://localhost/backend-angular/doctor/listardoctores.php')
  }

  borrarDoctor(id:string, usuario_id: string) : Observable<DoctoresApiService>{
    return this.http.get<DoctoresApiService>('http://localhost/backend-angular/doctor/eliminardoctor.php?id='+id+'&usuario_id='+usuario_id);
  }

  crearDoctor(doctores:Doctores): Observable<DoctoresApiService>  {    
    
    return this.http.post<DoctoresApiService>('http://localhost/backend-angular/doctor/insertardoctor.php', JSON.stringify(doctores));
  }

  obtenerDoctorId(id:string){
    return this.http.get<Doctores>('http://localhost/backend-angular/doctor/detalledoctor.php?id='+id);
  }

   getHospitales(){
    return this.http.get<Hospitales[]>('http://localhost/backend-angular/doctor/listarhospital.php')
  }


  editarDoctor(doctores:Doctores):Observable<DoctoresApiService>{
    return this.http.post<DoctoresApiService>('http://localhost/backend-angular/doctor/editardoctor.php',JSON.stringify(doctores));
  }


}


