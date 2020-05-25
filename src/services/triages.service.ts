import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Triages } from 'src/model/triage.model';

@Injectable({
  providedIn: 'root'
})
export class TriagesService {

 constructor(private http:HttpClient) { }


   getConsultas(id){
    return this.http.get<Triages[]>('http://localhost/backend-angular/triage/listartriage.php?id='+id)
  }



}
