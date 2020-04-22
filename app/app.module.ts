import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import {ModalPageModule} from './modal/modal.module'
import {ModalPage} from './modal/modal.page'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(environment.firebase),
            AngularFirestoreModule,AngularFireAuthModule,ModalPageModule
                    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireAuthModule,AngularFireAuth,UserService,ModalPage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {    }
