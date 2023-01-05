import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  private _storage: Storage | null = null;

  constructor( private storage: Storage,
               private toastCtrl: ToastController ) { 
    this.init()
    this.cargarFavoritos();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarPelicula( pelicula: PeliculaDetalle ){
    let existe = false;
    let mensaje = '';
    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else{
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos';
    }

    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas );

    return !existe;
  }

  async cargarFavoritos(){
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula( id: number ){

    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id);

    return (existe) ? true : false;
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  // public set(key: string, value: any) {
  //   this._storage?.set(key, value);
  // }
}
