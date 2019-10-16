import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  currentUserId: any;
  constructor(private firestore: AngularFirestore){

  }

  setUserId(userId) {
    this.currentUserId = userId;
  }

  createProfile(profile) {
    console.log(this.currentUserId);
    return this.firestore.collection('profiles').doc(this.currentUserId).set(profile);
  }

  updateProfile(profile) {
    return this.firestore.collection('profiles').doc(this.currentUserId).update(profile);
  }

  getProfile() {
    console.log(this.currentUserId);
    return this.firestore.collection('profiles').doc(this.currentUserId).valueChanges();
  }

  createQuests(quests) {
    return this.firestore.collection('quests').doc(this.currentUserId).set(quests);
  }

  updateQuests(quests) {
    return this.firestore.collection('quests').doc(this.currentUserId).update(quests);
  }

  getQuests() {
    return this.firestore.collection('quests').doc(this.currentUserId).valueChanges();
  }
}
