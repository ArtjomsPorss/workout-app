import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbnameVersionService } from './dbname-version.service';
import { Muscle } from '../interfaces/muscle.interface';
import { MuscleDto } from '../interfaces/muscle.dto.interface';
import { CommonStorageService } from './common.storage.service';

@Injectable()
export class MuscleStorageService extends CommonStorageService {
  public muscleList: BehaviorSubject<MuscleDto[]> = new BehaviorSubject<MuscleDto[]>([]);
  private isUserReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    sqliteService: SQLiteService,
    dbVerService: DbnameVersionService
  ) {
    super(sqliteService, dbVerService)
  }

  // to be called from parent constructor after DB initialised
  override reload(): void {
    this.getMuscles();
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
