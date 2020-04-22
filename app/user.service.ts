import { Injectable } from '@angular/core';
import {  AngularFireAuth } from '@angular/fire/auth';
import { error } from 'protractor';
interface user{
    username: string,
    uid: string
}


@Injectable()
export class UserService {

        private user: user
        private myId:string

        constructor(private afAuth:AngularFireAuth){

        }

        setUser(user:user){
            this.user=user
        }
        getUID(){
            if(!this.user){
                if(this.afAuth.currentUser){
                    const user=this.afAuth.currentUser
                    this.setUser({username:this.user.username,uid:this.user.username});
                    return this.user.uid
                }
                else{
                    throw new Error("user not logged in")
                }  
            }
            else{
                return this.user.uid
            }
        }
        setId(id:string ){
            this.myId=id;
            
            
        }
        getId(){
          console.log("getid is "+this.myId)
          return this.myId
      }
    }