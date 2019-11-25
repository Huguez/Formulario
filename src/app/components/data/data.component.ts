import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {
  [x: string]: any;
    
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
        'apellido': new FormControl( '', [ Validators.required, this.noHuguez ] )
        }),
      'email': new FormControl( '', [
          Validators.required,
          Validators.pattern( "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" )
        ]),
      'username': new FormControl( '', [ Validators.required], [this.existeUsuario] ),

      'pasatiempos': new FormArray( [ new FormControl("correr", Validators.required ) ] ),
      'password1': new FormControl('', Validators.required ),
      'password2': new FormControl()
    });
    
    this.forma.controls['password2'].setValidators([ Validators.required, this.noIgual.bind( this.forma ) ] )

    this.forma.controls['username'].valueChanges.subscribe( data => {
      console.log( data );
    });

    this.forma.controls['username'].statusChanges.subscribe( data => {
      console.log( data );
    });

  }

  ngOnInit(){}
  
  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push( new FormControl( '', Validators.required) );
  }

  guardarCambios(){
    console.log( this.forma );
  }

  noHuguez( control: FormControl ): { [s:string]:boolean }{
    if( control.value.toLowerCase() === "huguez" ){
      return { noHuguez:true }
    } 
    return null;
  }

  noIgual( control: FormControl ): { [s:string]:boolean } {
    
    if( control.value !== this.controls['password1'].value ){
      return {  noiguales: true }
    }

    return null; 
  }

  existeUsuario( control: FormControl  ): Promise<any> | Observable<any> {
      
     let promesa = new Promise( ( resolve, reject ) => {
       setTimeout( ()=> {
        if( control.value === 'hgz' ){
          resolve( { existe: true } );
        }else resolve( null )
        
      }, 1000 )
    });

    return promesa;
  }

}