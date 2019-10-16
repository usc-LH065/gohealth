import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  active_time = 0;
  distance = 0;
  calories = 0;
  hh = 0;
  mm = 0;
  ss = 0;
  km = 0;
  m = 0;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private iab: InAppBrowser) {
    
   }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.distance = parseInt(localStorage.getItem('distance'));
    this.active_time = parseInt(localStorage.getItem('time'));
    this.active_time = Math.round(this.active_time/1000);
    this.ss = this.active_time % 60;
    this.mm = Math.floor((this.active_time % 3600) / 60);
    this.hh = Math.floor(this.active_time / 3600);
    this.km = Math.floor(this.distance / 1000);
    this.m = Math.round(this.distance) % 1000;
    let met = 0;
    if (this.active_time>0) met = (this.distance/1000) / (this.active_time/3600);
    let bmr = 0;
    
    this.apiService.getProfile().subscribe((profile : any) => {
      if(profile !== undefined) {
        if(profile.gender == "m") {
          bmr = 13.397*profile.weight + 4.799*profile.height - 5.677*profile.age + 88.362;
        } else {
          bmr = 9.247*profile.weight + 3.098*profile.height - 4.330*profile.age + 447.593
        }
        this.calories = Math.round(bmr * met /24 * (this.active_time/3600)*100)/100;
      } else {
        alert("Please fill your profile.")
      }
    })
  }

}
