import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingController, MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup;
  alertMessage: string;

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthenticationService,
    public loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    private apiService: ApiService
    ) { }

  ngOnInit() {
    this.loginForm = this.buildloginForm();
  }

  ionViewWillEnter() {
    this.loginForm.reset();
    this.alertMessage = "";
    this.menuCtrl.enable(false);
    console.log(this.authService.userDetails());
    localStorage.setItem('distance','0');
    localStorage.setItem('time', '0');
  }

  buildloginForm(){
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(100)])]  ,
    });
  }
  
  async login(value) {
    this.alertMessage = "";
    if(this.loginForm.invalid){
      this.alertMessage = "Please insert valid email and password be of minimum 6 characteres.";
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();

    this.authService.loginUser(value)
    .then(async(res) => {
      this.apiService.setUserId(res.user.uid);
      await loading.dismiss();
      console.log(res);
      this.router.navigate(['/members/profile'])
    },async(err) => {
      await loading.dismiss();
      console.log(err.message);
      this.alertMessage = err.message;
    });

  }
  


}
