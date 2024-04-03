import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CommonStorageService } from './common.storage.service';
import { DbnameVersionService } from './dbname-version.service';
import { SQLiteService } from './sqlite.service';
import { capSQLiteChanges } from '@capacitor-community/sqlite';
import { TrainingWeek } from '../interfaces/training-week.interface';
import { TrainingWeekDto } from '../interfaces/training-week.dto.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainingWeekStorageService extends CommonStorageService {
  public exerciseList: BehaviorSubject<TrainingWeekDto[]> = new BehaviorSubject<TrainingWeekDto[]>([]);
  private isUserReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // to load data for specific plan
  private planIdSubject: BehaviorSubject<number>;
  private planId: Observable<number>;

  constructor(sqliteService: SQLiteService,
    dbVerService: DbnameVersionService
  ) {
    super(sqliteService, dbVerService);
    this.setUpPlanIdChangeTriggerExerciseListReload()
  }
  setUpPlanIdChangeTriggerExerciseListReload(): void {
    this.planIdSubject = new BehaviorSubject<number>(null)
    this.planId = this.planIdSubject.asObservable()
    this.planId.subscribe((planIdNumber) => this.reload())

  }
  override reload(): void {
    this.getAll();
  }
  state(planId: number) {
    this.planIdSubject.next(planId);
    return this.isUserReady.asObservable();
  }
  fetch(): Observable<TrainingWeekDto[]> {
    return this.exerciseList.asObservable();
  }
  async loadTrainingWeeks() {
    const exercises: TrainingWeekDto[] = 
    (await this.db.query(`SELECT * FROM training_week WHERE plan_id = "${this.planIdSubject.getValue()}";`))
      .values as TrainingWeekDto[];
    this.exerciseList.next(exercises);
  }
  async getAll() {
    await this.loadTrainingWeeks();
    this.isUserReady.next(true);
  }
  async getById(id: number): Promise<TrainingWeekDto[]> {
    const sql = `SELECT * FROM training_week WHERE id=${id} order by num ASC`
    return (await this.db.query(sql)).values as TrainingWeekDto[]
  }
  async add(trainingPlan: TrainingWeek) : Promise<number> {
    const sql = `INSERT INTO training_week (num, plan_id) VALUES (?, ?);`;
    const promise: capSQLiteChanges = await this.db.run(sql, [trainingPlan.num, trainingPlan.plan_id])
    await this.getAll();
    return promise.changes.lastId
  }
  async updateById(trainingPlan: TrainingWeekDto) {
    const sql = `UPDATE training_week SET num="${trainingPlan.num}" WHERE id=${trainingPlan.id}`;
    await this.db.run(sql);
    await this.getAll();
  }
  async deleteById(trainingPlan: TrainingWeekDto) {
    const sql = `DELETE FROM training_week WHERE id=${trainingPlan.id}`;
    await this.db.run(sql);
    await this.getAll();
  }
  setPlanId(planId: number) {
    this.planIdSubject.next(planId)
  }
}
