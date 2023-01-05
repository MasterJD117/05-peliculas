import { Component, Input, OnInit } from '@angular/core';
import { PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slidershow-poster-v2',
  templateUrl: './slidershow-poster-v2.component.html',
  styleUrls: ['./slidershow-poster-v2.component.scss'],
})
export class SlidershowPosterV2Component implements OnInit {

  @Input() peliculas: PeliculaDetalle[] = [];


  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    
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
