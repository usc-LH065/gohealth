import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd  } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  pages = [
    {
      title: 'Profile',
      url: 'members/profile',
      icon: 'contact'
    },
    {
      title: 'Questionnaire',
      url: 'members/questions',
      icon: 'help'
    },
    {
      title: 'Map',
      url: 'members/map',
      icon: 'locate'
    },
    {
      title: 'Statistics',
      url: 'members/results',
      icon: 'stats'
    },
    {
      title: 'Log Out',
      url: '',
      icon: 'log-out'
    }
  ]

  ngOnInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.pages.map( p => {
          return p['active'] = (event.url === p.url);
        });
      }
    });
  }
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.authService.isAuthenticated){
        this.router.navigateByUrl('/members/profile')
      } else {
        this.router.navigateByUrl('')
      }
      
    });
  }
  logout() {
    this.authService.logoutUser().then(res => {
      this.router.navigateByUrl('');
    })
  }
}
