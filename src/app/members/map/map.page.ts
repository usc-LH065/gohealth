import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router, NavigationExtras } from '@angular/router';

declare let google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {
  @ViewChild('map', {static: false}) mapContainer: ElementRef;

  map: any;
  currentMapTrack = null;

  cur_position : any;
  cur_latlng: any;

  isRunning: boolean;
  runningRoute = [];

  marker_me : any;

  runningLocationUpdates: any;
  startDate : Date;
  stopDate : Date;

  constructor(public geolocation: Geolocation,
    private router: Router) { }

  ngOnInit() {
    this.isRunning = false;
    this.initMap();
    
  }

  ionViewDidEnter() {
    this.geolocation.watchPosition
  }

  initMap() {
    this.geolocation.getCurrentPosition().then((cur_position) => {
      this.cur_latlng = new google.maps.LatLng(cur_position.coords.latitude, cur_position.coords.longitude);

      let mapOptions = {
        center: this.cur_latlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // disableDefaultUI: true
      };
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      
      this.marker_me = new google.maps.Marker({
        map: this.map,
        position: this.cur_latlng
      });
    });
  }

  startTrack() {
    this.isRunning = true;
    this.runningRoute = [];
    this.startDate = new Date();

    this.runningLocationUpdates = this.geolocation.watchPosition()
    .subscribe(cur_position  => {     
      this.cur_latlng = new google.maps.LatLng(cur_position.coords.latitude, cur_position.coords.longitude);
      this.map.setCenter(this.cur_latlng);
      this.runningRoute.push({lat: cur_position.coords.latitude, lng: cur_position.coords.longitude});
      this.redrawPath(this.runningRoute)
      this.showMelocation();
    })
  }

  showMelocation() {
    console.log(this.cur_latlng);
    this.marker_me.setPosition(this.cur_latlng)
  }

  stopTrack() {
    this.isRunning =  false;
    this.runningLocationUpdates.unsubscribe();
    this.stopDate = new Date();
    let tracking_time = this.stopDate.getTime() - this.startDate.getTime();
    let allDistance = 0;
    for(let i = 1; i < this.runningRoute.length; i++) {
      let latlng_p = new google.maps.LatLng(this.runningRoute[i-1].lat, this.runningRoute[i-1].lng);
      let latlng_c = new google.maps.LatLng(this.runningRoute[i].lat, this.runningRoute[i].lng);
      let dis = google.maps.geometry.spherical.computeDistanceBetween(latlng_p, latlng_c);
      allDistance += dis;      
    }
    localStorage.setItem('distance', allDistance.toString());
    localStorage.setItem('time', tracking_time.toString())

    this.router.navigate(['/members/results']);
  }

  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }

    if(path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#488D40',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }
}
