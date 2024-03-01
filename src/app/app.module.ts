import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage-angular';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { StorageService } from './services/storage.service';
import { SQLiteService } from './services/sqlite.service';
import { InitializeAppService } from './services/initialize.app.service';
import { DbnameVersionService } from './services/dbname-version.service';
import { InitStorageService } from './services/init.storage.service';
import { MuscleStorageService } from './services/muscle.storage.service';

export function initializeFactory(init: InitializeAppService) {
  return () => init.initialize();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__splitAndExercisesDb'
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    StorageService,
    MuscleStorageService,
    SQLiteService,
    InitializeAppService,
    InitStorageService,
    DbnameVersionService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
