import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.interface';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss'],
})
export class AddWorkoutComponent implements OnInit {
  exercises: Array<Exercise> = new Array<Exercise>;
  selectedExercise: Exercise | any;
  addedExercises: Array<Exercise> = new Array<Exercise>;

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.populateList();
    this.selectedExercise = this.exercises[0];
  }

  populateList() {
    this.storage.get('exercises').then((data: Exercise[] | null) => {
      if (data) {
        this.exercises = data;
      }
    });
  }

  addExercise() {
    this.addedExercises.push(this.selectedExercise);
    this.selectedExercise = this.exercises[0];
  }

  deleteExercise(exercise: Exercise) {
    const idx = this.addedExercises.indexOf(exercise);
    this.addedExercises.splice(idx, 1);
  }
}
