import { Injectable } from '@angular/core';

import { SQLiteService } from './sqlite.service';
import { StorageService } from './storage.service';

import { Capacitor } from '@capacitor/core';
import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';

@Injectable()
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(
    private sqliteService: SQLiteService,
    private storageService: StorageService,
    ) {
  }

  async initialize() {
    const platform = Capacitor.getPlatform();
    if(platform === "web") {
      // Web platform
      // required for toast component in Browser
      pwaElements(window);

      // required for jeep-sqlite Stencil component
      // to use a SQLite database in Browser
      jeepSqlite(window);

      window.addEventListener('DOMContentLoaded', async () => {
          const jeepEl = document.createElement("jeep-sqlite");
          document.body.appendChild(jeepEl);
          jeepEl.autoSave = true;
      });
    }


    await this.sqliteService.initializePlugin().then(async (ret) => {
      this.platform = this.sqliteService.platform;
      try {
        if( this.sqliteService.platform === 'web') {
          await this.sqliteService.initWebStore();
        }
        // Initialize the myfitnessdb database
        const DB_USERS = 'myfitnessdb'
        await this.storageService.initializeDatabase(DB_USERS);
        // Here Initialize MOCK_DATA if required

        // Initialize whatever database and/or MOCK_DATA you like

        if( this.sqliteService.platform === 'web') {
          await this.sqliteService.saveToStore(DB_USERS);
        }

        this.isAppInit = true;

      } catch (error) {
        console.log(`initializeAppError: ${error}`);
        // await Toast.show({
        //   text: `initializeAppError: ${error}`,
        //   duration: 'long'
        // });
      }
    });
  }

}
