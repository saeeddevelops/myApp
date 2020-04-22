import { Component, OnInit, Injectable, Input } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';




export interface Item {
   IntTitle: string;
   IntDescp: string;
   Id:string;
}
export interface userId {
  Id:string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
@Injectable()
export class ModalPage implements OnInit {

  IntTitle: string=""
  IntDescp: string=""
  
  item:Item;
  userid:userId
  //flag:boolean;
  @Input() lastName: string;
  @Input() create: boolean;
  @Input() edit: boolean;
  @Input() id: string;
  
  private itemsCollection: AngularFirestoreCollection<Item>;
  private itemDoc: AngularFirestoreDocument<userId>;
  items: Observable<Item[]>;
  docitem: Observable<userId>;
  constructor(public afs:AngularFirestore,
              public user:UserService,
               public alertController:AlertController,
              public router:Router,
              public modalCtrl:ModalController) {
                this.item={
                      IntTitle:"",
                      IntDescp:"",
                      Id:""
              } 
              this.userid={
                      Id:""
              } 
              //this.flag=this.flagg;     
                     
  }
                    
  ngOnInit() {
  }
  // async setFlag(flag:boolean){
  //   this.flag=this.flagg;
  // }
  async saveCol(){
    
    const id = this.afs.createId();
    
    this.item={
      IntTitle:this.IntTitle,
      IntDescp:this.IntDescp,
      Id:id 
    }
    this.userid={
      Id:this.user.getUID()
    }
    const{IntTitle,IntDescp}=this
    //this.afs.collection
    try {
      
      //  this.itemsCollection= await this.afs.collection('interests').doc(this.user.getUID()).collection<Item>('interest')
      //  this.itemDoc=await this.afs.collection('interests').doc<userId>(this.user.getUID())
      //  console.log("user id in modal is "+this.user.getUID())
       
      //  //this.itemsCollection.add(this.item)
      //  this.items = this.itemsCollection.valueChanges();
      //  this.docitem=this.itemDoc.valueChanges();
      //  this.itemDoc.set(this.userid)
      //  this.itemsCollection.doc(id).set(this.item)
      //  //this is to dismiss modal
          this.modalCtrl.dismiss(this.item);
       
       console.log('new doc id is '+ id) 
      
      //this.router.navigate(['/display'])
    } catch (error) {
      console.dir(error)
      
    }
  }

  async updateCol(){
    
    this.item={
      IntTitle:this.IntTitle,
      IntDescp:this.IntDescp,
      Id:this.id 
    }
    this.itemsCollection= await this.afs.collection('interests').doc(this.user.getUID()).collection<Item>('interest')
     this.itemsCollection.doc(this.id).update(this.item)
     this.modalCtrl.dismiss(this.item);
  }

  async dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    
  }

}
