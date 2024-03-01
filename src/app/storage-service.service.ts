import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Exercise } from './exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  private database: SQLiteObject | any;

  constructor(private storage: Storage, private sqlite: SQLite) { 
    this.initDatabase();
    this.addUser("someuser");
    let users = this.getUsers().then(u => {
      console.log(`users: ${u}`);
    });
    
  }

  private async initDatabase() {
    try {
      this.database = await this.sqlite.create({
        name: 'myDatabase.db',
        location: 'default',
      });

      // Create tables or perform other initialization if needed
      await this.database.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async addUser(name: string): Promise<void> {
    await this.database.executeSql('INSERT INTO users (name) VALUES (?)', [name]);
  }

  async getUsers(): Promise<any[]> {
    const result = await this.database.executeSql('SELECT * FROM users', []);
    const users = [];

    for (let i = 0; i < result.rows.length; i++) {
      users.push(result.rows.item(i));
    }

    return users;
  }

  saveExercises(exercises: Array<Exercise>) {
    this.storage.set('exercises', exercises);
  }


}
