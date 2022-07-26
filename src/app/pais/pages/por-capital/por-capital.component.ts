import { Component } from '@angular/core';
import { Country } from '../../interface/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }

    a {
      color: #5b67f5;
    }
    `
  ]
})
export class PorCapitalComponent{

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencia: boolean = false;

  constructor( private paisService: PaisService ) { }

  buscar( termino: string ){
    this.mostrarSugerencia = false;
    this.hayError = false;
    this.termino = termino;
    // console.log(this.termino);
    this.paisService.buscarCapital( this.termino )
        .subscribe({
          next: (resp) =>{
            this.paises = resp;
            // console.log( this.paises );
          },
          error: (err) => {
            // console.log('Error');
            console.info(err);
            this.hayError = true;
            this.paises = [];
          }
        });
  }

  sugerencias( termino: string) {
    if (!termino) {
      this.hayError = false;
      this.mostrarSugerencia = false;
      this.paisesSugeridos = [];
      return;}
    this.termino = termino;
    this.hayError = false;
    this.paisService.buscarCapital( termino )
    .subscribe({
      next: (resp) =>{
        this.paisesSugeridos = resp.splice(0,5); //Uso el splice para mostrar solo 3 resultados
        // console.log( this.paisesSugeridos );
      },
      error: (err) => {
        // console.log('Error');
        // console.info(err);
        this.hayError = true;
        this.paisesSugeridos = [];
      }
    });
    this.mostrarSugerencia = true;
  }

}
