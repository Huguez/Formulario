import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [ /*`.ng-invalid.ng-touched:not(form){
    border: solid red;
  }`*/]
})
export class TemplateComponent implements OnInit {
  
  usuario:any = { 
    nombre: null,
    apellido: null,
    email: null,
    pais: "",
    sexo: "",
    aceptar: false
  };

  paises = [{
    codigo: "MX",
    nombre: "Mexico"
  },{
    codigo: "USA",
    nombre: "Estados unidos"
  },{
    codigo: "CRI",
    nombre: "Costa Rica"
  } ];
  
  sexo:string[] = [ "Hombre", "Mujer" ];

  constructor() { }

  ngOnInit() {
  }
  
  guardar( form:NgForm ){
    console.log( form );
  }
}