import { Component } from '@angular/core';
import { Country } from '../../interface/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html'
})
export class PorRegionComponent {

  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];
  regionActiva: string = '';
  paises: Country[] = [];
  carga: boolean = false;

  constructor( private paisService: PaisService) { }

  getClassCSS( region: string ): string{
    return (region === this.regionActiva) ? 'btn btn-primary me-2 mt-1': 'btn btn-outline-primary me-2 mt-1';
  } // Para que el boton se quede seleccionado, es un metodo para usar el css segun la condición

  buscar( region: string ){
    if ( region === this.regionActiva ) {return;}
    this.carga = true;
    this.paises = [];
    this.regionActiva = region;
    // console.log(this.regionActiva);
    this.paisService.buscarRegion( this.regionActiva )
        .subscribe({
          next: (resp) =>{
            this.carga = false;
            this.paises = resp;
            // console.log( this.paises );
          },
          error: (err) => {
            // console.log('Error');
            console.info(err);
            this.paises = [];
          }
        });
  }

}
