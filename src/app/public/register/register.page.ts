import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm : FormGroup;
  alertMessage: string;
  successMessage: string;
  
  constructor(private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthenticationService,
    private menuCtrl: MenuController,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.registerForm = this.buildloginForm();
  }

  ionViewWillEnter() {
    this.registerForm.reset();
    this.alertMessage = "";
    this.successMessage = "";
    this.menuCtrl.enable(false);
  }

  buildloginForm(){
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(100)])],
      cpassword: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(100)])],
    });
  }

  async register(value) {
    this.alertMessage = "";
    this.successMessage = "";
    if(value.cpassword !== value.password) {
      this.alertMessage = "Don't match the password.";
      return;
    }
    if(this.registerForm.invalid){
      this.alertMessage = "Please insert valid email and password be of minimum 6 characters.";
      return;
    }
    
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();

    this.authService.registerUser(value)
    .then(async (res) => {
      await loading.dismiss();
      console.log(res);
      this.successMessage = "Your account has been created. Please Sign in.";
    }, async(err) => {
      await loading.dismiss();
      console.log(err.message);
      this.alertMessage = err.message;
    });


  }
  
}
