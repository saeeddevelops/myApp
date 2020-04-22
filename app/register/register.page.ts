import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import 'firebase/firestore';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string=""
  password: string=""
  title: string=""
  address: string=""
  city: string=""
  state: string=""
  zip: string=""

  constructor(public auth: AngularFireAuth,
              public store:AngularFirestore,
              public user:UserService,
              public alertController:AlertController,
              public router:Router) { }

  ngOnInit() {
  }

  async presentAler(title:string,content:string){
            const alert= await this.alertController.create({
              header: title, 
              message: content,
              buttons: ['OK']
              
            })
            await alert.present()
  }

  async register(){

    const{username,password,title,city,address,state,zip}=this
    try {
      const res=await this.auth.createUserWithEmailAndPassword(username,password);
      this.store.doc(`users/${res.user.uid}`).set({
        username,
        title,
        city,
        address,
        state,
        zip
      })
      this.user.setUser({
        username,
        uid: res.user.uid
      })
      this.presentAler('success','you are registered')
      this.router.navigate(['/display'])
    } catch (error) {
      console.dir(error)
      
    }
  }

}
