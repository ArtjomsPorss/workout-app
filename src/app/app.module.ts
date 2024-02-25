import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage-angular';
// import { Drivers } from '@ionic/storage';
// import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicStorageModule.forRoot(
      {
    name: '__splitAndExercisesDb',
    // driverOrder: [
    //   cordovaSQLiteDriver._driver,
    //   Drivers.LocalStorage,
    //   Drivers.IndexedDB,
    // ],
  }
  )
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
