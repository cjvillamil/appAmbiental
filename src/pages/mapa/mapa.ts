import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare const google;
/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  myLocation;
  map;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad MapaPage');
  }

  initMap() {
    
    this.myLocation = {lat: 4.646412, lng: -74.077778};
    console.log(this.myLocation)
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: this.myLocation,
      mapTypeId: 'satellite'
    });
  }

}
