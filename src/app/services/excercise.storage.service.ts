import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbnameVersionService } from './dbname-version.service';
import { Exercise } from '../interfaces/exercise.interface';
import { CommonStorageService } from './common.storage.service';
import { ExerciseDto } from '../interfaces/exercise.dto.interface';

@Injectable()
export class ExcerciseStorageService extends CommonStorageService {
  public exerciseList: BehaviorSubject<ExerciseDto[]> = new BehaviorSubject<ExerciseDto[]>([]);
  private isUserReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    sqliteService: SQLiteService,
    dbVerService: DbnameVersionService
  ) {
    super(sqliteService, dbVerService);
  }

  override reload(): void {
    this.getAll();
  }

  state() {
    return this.isUserReady.asObservable();
  }
  fetch(): Observable<ExerciseDto[]> {
    return this.exerciseList.asObservable();
  }

  async loadExercises() {
    const exercises: ExerciseDto[] = (await this.db.query('SELECT * FROM exercises;'))
    .values as ExerciseDto[];
    this.exerciseList.next(exercises);
  }
  async getAll() {
    await this.loadExercises();
    this.isUserReady.next(true);
  }
  async add(exercise: Exercise) {
    const sql = `INSERT INTO exercises (name, additionalInfo) VALUES (?, ?);`;
    await this.db.run(sql, [exercise.name, exercise.additionalInfo]);
    await this.getAll();
  }

  async updateById(exercise: ExerciseDto) {
    const sql = `UPDATE exercises SET name=${exercise.name}, additionalInfo=${exercise.additionalInfo} WHERE id=${exercise.id}`;
    await this.db.run(sql);
    await this.getAll();
  }
  async deleteById(exercise: ExerciseDto) {
    const sql = `DELETE FROM exercises WHERE id=${exercise.id}`;
    await this.db.run(sql);
    await this.getAll();
  }
}
