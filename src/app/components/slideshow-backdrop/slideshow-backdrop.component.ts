import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  constructor( private modalCtrl: ModalController ) { }

  slidesOpts = {
    slidesPerView: 1.3,
    freeMode: true,
    
  }

  ngOnInit() {}

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
