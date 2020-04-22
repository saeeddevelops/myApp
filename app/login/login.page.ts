import { Component, OnInit } from '@angular/core';


import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string=""
  password: string=""
  constructor(public auth: AngularFireAuth, public user:UserService,public router:Router) { }

  ngOnInit() {
  }
  
  async login(){

      const{username,password}=this
      try {
        const res=await this.auth.signInWithEmailAndPassword(username,password);
        if(res.user){
          this.user.setUser({
            username,
            uid: res.user.uid
          })
          this.router.navigate(['/display'])
        }

      } catch (error) {
        console.dir(error)
        if(error.code==="auth/operation-not-allowed"){
          console.log("user not found");
        }
      }
  }

}
