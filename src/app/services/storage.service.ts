import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable} from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbnameVersionService } from './dbname-version.service';
import { UserUpgradeStatements } from '../upgrades/user.upgrade.statements';
import { Exercise } from '../exercise.interface';

@Injectable()
export class StorageService {
  public exerciseList: BehaviorSubject<Exercise[]> =
  new BehaviorSubject<Exercise[]>([]);
  private databaseName: string = "";
  private uUpdStmts: UserUpgradeStatements = new UserUpgradeStatements();
  private versionUpgrades;
  private loadToVersion;
  private db!: SQLiteDBConnection;
  private isUserReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqliteService: SQLiteService,
  private dbVerService: DbnameVersionService) {
    this.versionUpgrades = this.uUpdStmts.userUpgrades;
    this.loadToVersion = this.versionUpgrades[this.versionUpgrades.length-1].toVersion;
  }
  async initializeDatabase(dbName: string) {
    this.databaseName = dbName;
    // create upgrade statements
    await this.sqliteService
      .addUpgradeStatement({  database: this.databaseName,
                              upgrade: this.versionUpgrades});
    // create and/or open the database
    this.db = await this.sqliteService.openDatabase(this.databaseName,
                                          false,
                                          'no-encryption',
                                          this.loadToVersion,
                                          false
    );
    this.dbVerService.set(this.databaseName,this.loadToVersion);

    await this.getExercises();
  }
  exerciseState() {
    return this.isUserReady.asObservable();
  }
  fetchExercises(): Observable<Exercise[]> {
    return this.exerciseList.asObservable();
  }

  async loadExercises() {
    const users: Exercise[]= (await this.db.query('SELECT * FROM exercises;')).values as Exercise[];
    this.exerciseList.next(users);
  }
  async getExercises() {
    await this.loadExercises();
    this.isUserReady.next(true);
  }
  async addExercise(exercise: Exercise) {
    const sql = `INSERT INTO exercises (name, additional_info) VALUES (?, ?);`;
    await this.db.run(sql,[exercise.name, exercise.additionalInfo]);
    await this.getExercises();
  }

  async updateExerciseById(id: string, active: number) {
    const sql = `UPDATE exercises SET active=${active} WHERE id=${id}`;
    await this.db.run(sql);
    await this.getExercises();
  }
  async deleteUserById(id: string) {
    const sql = `DELETE FROM exercises WHERE id=${id}`;
    await this.db.run(sql);
    await this.getExercises();
  }
}
