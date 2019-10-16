import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm : FormGroup;
  alertMessage: string;
  isEmptyProfile : boolean;

  constructor(private fb: FormBuilder, 
    private router: Router,
    private apiService: ApiService,
    private menuCtrl: MenuController) { }

  ngOnInit() {
  
    this.profileForm = this.fb.group({
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      height: ['', [Validators.required]],
      weight: ['', [Validators.required]]
    });   
  }

  ionViewWillEnter() {
    this.alertMessage = "";
    this.menuCtrl.enable(true);
    this.apiService.getProfile().subscribe((profile: any) => {
      console.log(profile);
      if(!profile) this.isEmptyProfile = true;
      if(profile !== undefined) {
        this.isEmptyProfile = false;
        this.profileForm.controls['gender'].setValue(profile.gender);
        this.profileForm.controls['age'].setValue(profile.age);
        this.profileForm.controls['height'].setValue(profile.height);
        this.profileForm.controls['weight'].setValue(profile.weight);
      }
    })
  }

  submitProfile(value) {
    this.alertMessage = "";

    if(this.profileForm.invalid){
      this.alertMessage = "Please enter all fields.";
      return;
    }
    if(this.isEmptyProfile) {
      this.apiService.createProfile(value).then(res => {
        this.router.navigate(['/members/questions']);
      }, err => {
        this.alertMessage = err.message;
      });
      
    } else {
      this.apiService.updateProfile(value).then(res => {
        this.router.navigate(['/members/questions']);      
      }, err => {
        this.alertMessage = err.message;
      })
    }
  }

  skip() {
    this.router.navigate(['/members/questions']);
  }

}
