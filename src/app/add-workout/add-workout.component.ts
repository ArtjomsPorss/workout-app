import { Component, OnInit } from '@angular/core';
import { Exercise } from '../interfaces/exercise.interface';
import { Storage } from '@ionic/storage-angular';
import { switchMap, of } from 'rxjs';
import { ExcerciseStorageService } from '../services/excercise.storage.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss'],
})
export class AddWorkoutComponent implements OnInit {
  exercises: Array<Exercise> = new Array<Exercise>;
  selectedExercise: Exercise | any;
  addedExercises: Array<Exercise> = new Array<Exercise>;

  constructor(private exerciseStorage: ExcerciseStorageService) { }

  ngOnInit() {
    this.populateList();
    this.selectedExercise = this.exercises[0];
  }

  populateList() {
    try {
      this.exerciseStorage.state().pipe(
        switchMap(res => {
          if (res) {
            return this.exerciseStorage.fetch();
          } else {
            return of([]); // Return an empty array when res is false
          }
        })
      ).subscribe(data => {
        this.exercises = data; // Update the user list when the data changes
      });

    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  addWorkoutExercise() {
    this.addedExercises.push(this.selectedExercise);
    this.selectedExercise = this.exercises[0];
    this.selectedExercise = '';
  }

  deleteWorkoutExercise(exercise: Exercise) {
    const idx = this.addedExercises.indexOf(exercise);
    this.addedExercises.splice(idx, 1);
  }
}
