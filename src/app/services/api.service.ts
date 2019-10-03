import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  currentUser: any;
  constructor(private firestore: AngularFirestore) {
    this.currentUser = firebase.auth().currentUser;

  }

  createProfile(profile) {
    return this.firestore.collection('profiles').doc(this.currentUser.uid).set(profile);
  }

  updateProfile(profile) {
    return this.firestore.collection('profiles').doc(this.currentUser.uid).update(profile);
  }

  getProfile() {
    return this.firestore.collection('profiles').doc(this.currentUser.uid).valueChanges();
  }

  createQuests(quests) {
    return this.firestore.collection('quests').doc(this.currentUser.uid).set(quests);
  }

  updateQuests(quests) {
    return this.firestore.collection('quests').doc(this.currentUser.uid).update(quests);
  }

  getQuests() {
    return this.firestore.collection('quests').doc(this.currentUser.uid).valueChanges();
  }
}
