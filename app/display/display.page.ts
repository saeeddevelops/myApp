import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import 'firebase/firestore';
import { UserService } from '../user.service';
import { ModalPage } from '../modal/modal.page';
import { ModalController } from '@ionic/angular';
import {OverlayEventDetail} from '@ionic/core'; 




export interface Item { 
  username: string;
  password: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string; 

}
export interface Interests {
  IntTitle: string;
  IntDescp: string;
  Id:string;
}

export interface interestsDocItem{
  ID:string;
}


@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
     styleUrls: ['./display.page.scss'],

})

export class DisplayPage implements OnInit {
  
  private itemDoc: AngularFirestoreDocument<Item>;
  private interestsDoc: AngularFirestoreDocument<interestsDocItem>;
  private itemsCollection: AngularFirestoreCollection<Interests>;
  item: Observable<Item>;
  interests:Observable<Interests[]>;
  intId: Observable<string[]>;
  myId:string;
  intDoc:interestsDocItem;
  
  constructor(private afs:AngularFirestore,private user:UserService,public modalController: ModalController 
                ,private mod:ModalPage
                ) {
    const size$ = new Subject<string>();
    
    this.itemDoc  = afs.collection('users').doc<Item>(user.getUID())
    this.item = this.itemDoc.valueChanges();
    this.intDoc={
      ID:this.user.getUID()
    }
    this.saveUserInterests()

}

async saveUserInterests(){
  const abc = this.user.getUID();
  let collection=this.afs.collection<Interests>('interests', ref => ref.where('ID', '==', abc))
  let getDoc = collection.get().toPromise().then(doc => {
  if (doc.empty) {
    this.itemsCollection=this.afs.collection<Interests>('interests')
    this.interestsDoc = this.itemsCollection.doc(this.user.getUID())
    this.interestsDoc.set(this.intDoc)
           
  }  else{

    this.itemsCollection=this.afs.collection<Interests>('interests')
    this.interestsDoc = this.itemsCollection.doc(this.user.getUID())
    this.itemsCollection = this.afs.collection<Interests>('interests', ref => ref.where('ID', '==', abc))
    //this.interests=this.itemsCollection.valueChanges();
    //console.log("document id is "+ this.interests.Id )
        this.intId=this.itemsCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data=a.payload.doc.data
            const id = a.payload.doc.id ;
            return id;
          }))
        );
        this.intId.subscribe( actions =>{          
        this.user.setId(actions[0])
        this.displayData(this.user.getUID())       
      })
     // console.log('awaited text is', this.user.getId);
  }
})
.catch(err => {
  console.log('Error getting document', err);
});
}

async displayData(user:string){
        this.itemsCollection = this.afs.collection<Interests>('interests').doc(user).collection('interest')
        this.interests=this.itemsCollection.valueChanges();  
}


async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'create': true,
        'edit':false
      },
      cssClass: 'my-custom-modal-css'
    });
    modal.onDidDismiss().then((data: OverlayEventDetail) => { 
      this.interestsDoc.collection('interest').doc(data.data.Id).set(data['data'])
      this.displayData(this.user.getUID())
    });
    return await modal.present();
  }

  async  editModal(id:string){
    
      const modal = await this.modalController.create({
        component: ModalPage,
        componentProps: {
          'id':id,
          'create': false,
          'edit':true
        },
        
      });
      // this.mod.setFlag(false)
      
      return await modal.present();    
  }

  deleteDoc(id:string){
    this.itemsCollection.doc(id).delete()
    
  }

  ngOnInit() {
  }

}
