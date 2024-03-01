import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbnameVersionService } from './dbname-version.service';
import { UserUpgradeStatements } from '../upgrades/user.upgrade.statements';
import { Muscle } from '../interfaces/muscle.interface';
import { MuscleDto } from '../interfaces/muscle.dto.interface';

@Injectable()
export class MuscleStorageService {
  public muscleList: BehaviorSubject<MuscleDto[]> = new BehaviorSubject<MuscleDto[]>([]);
  private databaseName: string = '';
  private uUpdStmts: UserUpgradeStatements = new UserUpgradeStatements();
  private versionUpgrades;
  private loadToVersion;
  private db!: SQLiteDBConnection;
  private isUserReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqliteService: SQLiteService,
    private dbVerService: DbnameVersionService
  ) {
    this.versionUpgrades = this.uUpdStmts.userUpgrades
    this.loadToVersion =
      this.versionUpgrades[this.versionUpgrades.length - 1].toVersion
      const DB_USERS = 'myfitnessdb'
      this.initializeDatabase(DB_USERS)
  }
  async initializeDatabase(dbName: string) {
    this.databaseName = dbName;
    // create upgrade statements
    await this.sqliteService.addUpgradeStatement({
      database: this.databaseName,
      upgrade: this.versionUpgrades,
    });
    // create and/or open the database
    this.db = await this.sqliteService.openDatabase(
      this.databaseName,
      false,
      'no-encryption',
      this.loadToVersion,
      false
    );
    this.dbVerService.set(this.databaseName, this.loadToVersion);
    this.getMuscles()
  }
  state() {
    return this.isUserReady.asObservable();
  }
  
  fetch(): Observable<MuscleDto[]> {
    return this.muscleList.asObservable();
  }

  async loadMuscles() {
    const muscles: MuscleDto[] = (await this.db.query('SELECT * FROM muscles;'))
      .values as MuscleDto[];
    this.muscleList.next(muscles);
  }
  async getMuscles() {
    await this.loadMuscles();
    this.isUserReady.next(true);
  }
  async add(muscle: Muscle) {
    const sql = `INSERT INTO muscles (name) VALUES (?);`;
    await this.db.run(sql, [muscle.name]);
    await this.getMuscles();
  }

  async updateById(muscle: MuscleDto) {
    const sql = `UPDATE muscles SET name=${muscle.name} WHERE id=${muscle.id}`;
    await this.db.run(sql);
    await this.getMuscles();
  }
  async deleteById(muscle: MuscleDto) {
    const sql = `DELETE FROM muscles WHERE id=${muscle.id}`;
    await this.db.run(sql);
    await this.getMuscles();
  }
}
