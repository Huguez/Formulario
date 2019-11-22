import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {
  
  forma:FormGroup;
  usuario:any = {
    nombreCompleto: {
      nombre: "Carlos",
      apellido: "Huguez"
    },
    email: "carlos.huguez@gmail.com",
    pasatiempos: [ "correr", "leer", "ver peliculas" ]
  };

  constructor(){
    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl( '', [ Validators.required, Validators.minLength( 5 ) ] ),
        'apellido': new FormControl( '', [ Validators.required, Validators.minLength( 5 ) ] )
    }),
      'email': new FormControl( '', [
          Validators.required,
          Validators.pattern( "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" )
        ] ),
        'pasatiempos' : new FormArray( [ new FormControl("correr", Validators.required ) ] )
    });
  }

  ngOnInit(){}
  
  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push( new FormControl( '', Validators.required) );
  }

  guardarCambios(){
    console.log( this.forma )
    
    //this.forma.setValue( this.usuario );
    //this.forma.reset( this.usuario );
  }

}
