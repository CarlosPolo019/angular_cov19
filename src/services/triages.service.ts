import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Triages } from 'src/model/triage.model';
import { Pacientes } from 'src/model/pacientes';

@Injectable({
  providedIn: 'root'
})
export class TriagesService {

 constructor(private http:HttpClient) { }


   getConsultas(id){
    return this.http.get<Triages[]>('http://localhost/backend-angular/triage/listartriage.php?id='+id)
  }

crearTriage(triage:Triages): Observable<TriagesService>  {    
    
    return this.http.post<TriagesService>('http://localhost/backend-angular/triage/insertartriage.php', JSON.stringify(triage));
  }

  getPacientes(){
    return this.http.get<Pacientes[]>('http://localhost/backend-angular/paciente/listarpacientes.php')
  }

}
