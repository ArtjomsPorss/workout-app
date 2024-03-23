import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonStorageService } from './common.storage.service';
import { DbnameVersionService } from './dbname-version.service';
import { SQLiteService } from './sqlite.service';
import { TrainingPlanDto } from '../interfaces/training-plan.dto.interface';
import { TrainingPlan } from '../interfaces/training-plan.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainingPlanStorageService extends CommonStorageService {
  public exerciseList: BehaviorSubject<TrainingPlanDto[]> = new BehaviorSubject<TrainingPlanDto[]>([]);
  private isUserReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(sqliteService: SQLiteService,
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
  fetch(): Observable<TrainingPlanDto[]> {
    return this.exerciseList.asObservable();
  }
  async loadTrainingPlans() {
    const exercises: TrainingPlanDto[] = (await this.db.query('SELECT * FROM training_plan;'))
      .values as TrainingPlanDto[];
    this.exerciseList.next(exercises);
  }
  async getAll() {
    await this.loadTrainingPlans();
    this.isUserReady.next(true);
  }
  async add(trainingPlan: TrainingPlan) {
    const sql = `INSERT INTO training_plan (name) VALUES (?);`;
    await this.db.run(sql, [trainingPlan.name]);
    await this.getAll();
  }
  async updateById(trainingPlan: TrainingPlanDto) {
    const sql = `UPDATE training_plan SET name=${trainingPlan.name} WHERE id=${trainingPlan.id}`;
    await this.db.run(sql);
    await this.getAll();
  }
  async deleteById(trainingPlan: TrainingPlanDto) {
    const sql = `DELETE FROM training_plan WHERE id=${trainingPlan.id}`;
    await this.db.run(sql);
    await this.getAll();
  }
}
