import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  peliculas: Pelicula[] = [];
  spinner: boolean = false;
  ideas: string[] = ['Spiderman', 'Avatar', 'El señor de los anillos', 'Megan', 'Black adam'];

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController ) {}

  buscar(event: any){
    const valor: string = event.detail.value;

    if (valor.length === 0) {
      this.spinner= false;
      this.peliculas = [];
      return;
    }

    this.spinner = true
    // console.log(valor);
    this.moviesService.buscarPeliculas(valor)
      .subscribe( resp => {
        console.log(resp);
        this.peliculas = resp.results;
        this.spinner = false;
      });
    // this.spinner = false;
  }

  onClick( idea: string){
    this.textoBuscar = idea;
  }


  async verDetalle(idPelicula: any){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id: idPelicula
      }
    });

    modal.present();
  }

}
