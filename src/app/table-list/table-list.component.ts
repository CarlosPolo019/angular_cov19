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
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
    addForm: FormGroup;
    isBoolean = true;
    valueFrom : [];
    pacientes: [];
    options = [
        {
            name: "SURA",
            value: 1
        },
        {
            name: "COOMEVA",
            value: 2
        },
        {
            name: "SUSALUD",
            value: 1
        },
        {
            name: "CAFESALUD",
            value: 2
        },
        {
            name: "VIVA1A",
            value: 2
        }
    ];
    constructor(private formBuilder: FormBuilder, private router: Router) {}


    ngOnInit(): void {

        this._cargarInfo()
        this.addForm = this.formBuilder.group({
            id: [],
            nombre_completo: ['', Validators.required],
            direccion: ['', Validators.required],
            nombre_acom: ['', Validators.required],
            telefono_acom: ['', Validators.required],
            eps: ['', Validators.required]
        });

    }
// Una de las razones por las que se introdujo async/await era 
// para evitar el conocido “callback hell” en el que las funciones 
// se anidaban varios niveles. Esto sucede muy comúnmente cuando el 
// resultado de una función requiere de posteriores consultas y validaciones.
// En este caso sino se crea la funcion asincrona, no fuera posible refreschar 
// EL array sin primero actualizar la pagina
    async onSave(form) {

const axiosInstance = Axios.create(Api.AXIOS_CONF);
var url = ""
    	if(this.isBoolean){
    		url = '/phpweb/insertarPaciente.php';
    		console.log("Agregar")
    	}else{
    		url = '/phpweb/editarPaciente.php';
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
            this.ngOnInit();
    }


    _cargarInfo() {
        const axiosInstance = Axios.create(Api.AXIOS_CONF);
        axiosInstance.get("/phpweb/listarPacientes.php").then((response) => {
            console.log(response.data)
            this.pacientes = response.data
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