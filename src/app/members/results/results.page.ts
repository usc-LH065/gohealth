import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router) {
    
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
    this.mm = Math.round(this.distance) % 1000;
  }

}
