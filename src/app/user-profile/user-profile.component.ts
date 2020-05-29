import {
    Component,
    OnInit,
    Inject
} from '@angular/core';
import {
    Router
} from '@angular/router';
import Axios from 'axios';
import * as Api from "../../constants/api";
import {
    FormBuilder,
    Validators,
    FormGroup
} from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    addForm: FormGroup;
    isBoolean = true;
    valueFrom : [];
    pacientes: [];
    dataH : [];
 
      options = [
    { name: "B-", value: 5 },
    { name: "B+", value: 6 },
    { name: "AB-", value: 7 },
    { name: "AB+", value: 8 },
    { name: "O-", value: 1 },
    { name: "O+", value: 2 },
    { name: "A-", value: 3 },
    { name: "A+", value: 4 },
];



    constructor(private formBuilder: FormBuilder, private router: Router) {}


    ngOnInit(): void {
    	this._cargarHospitales();
        this._cargarInfo();
        this.addForm = this.formBuilder.group({
            id: [],
            nombre_completo: ['', Validators.required],
            direccion: ['', Validators.required],
            fecha_nacimiento: ['', Validators.required],
            telefono: ['', Validators.required],
              experiencia: ['', Validators.required],
                hospital: ['', Validators.required],
            tipo_sangre: ['', Validators.required]

        });

    }
// Una de las razones por las que se introdujo async/await era 
// para evitar el conocido “callback hell” en el que las funciones 
// se anidaban varios niveles. Esto sucede muy comúnmente cuando el 
// resultado de una función requiere de posteriores consultas y validaciones.
// En este caso sino se crea la funcion asincrona, no fuera posible refreschar 
// EL array sin primero actualizar la pagina
   // async 
    onSave(form) {

const axiosInstance = Axios.create(Api.AXIOS_CONF);
var url = ""
console.log(form)
    	/*if(this.isBoolean){
    		url = '/phpweb/insertarDoctor.php';
    		console.log("Agregar")
    	}else{
    		url = '/phpweb/editarDoctor.php';
    		console.log("Editar")
    	}
       
            await axiosInstance.post(url, {
                    data: form
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(response) {
                	
                    jQuery("#exampleModal .close").click()

                })
                .catch(function(error) {
                    console.log(error);
                })
            this.ngOnInit();*/
    }


    _cargarInfo() {
        const axiosInstance = Axios.create(Api.AXIOS_CONF);
        axiosInstance.get("/phpweb/listarPacientes.php").then((response) => {
            console.log(response.data)
            this.pacientes = response.data
        });
    }


    _cargarHospitales() {
        const axiosInstance = Axios.create(Api.AXIOS_CONF);
        axiosInstance.get("/phpweb/listarHospital.php").then((response) => {
            console.log(response.data)
            this.dataH = response.data
        });
    }

   async eliminar(id) {

 const axiosInstance = Axios.create(Api.AXIOS_CONF);
       await axiosInstance.get("/phpweb/EliminarPaciente.php?id="+id).then((response) => {
            console.log(response.data)
            this.pacientes = response.data
        });

        this.ngOnInit();

    }


async cargarDetallePaciente(id){

 const axiosInstance = Axios.create(Api.AXIOS_CONF);
   await axiosInstance.get("/phpweb/detallePaciente.php?id="+id.toString()).then((response) => {
            console.log(response.data)
            this.addForm.setValue(response.data)
        });

}


}
