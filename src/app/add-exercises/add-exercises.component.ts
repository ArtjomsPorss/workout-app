import { Component, OnInit } from '@angular/core';
import { Exercise } from '../interfaces/exercise.interface';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../services/storage.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-exercises',
  templateUrl: './add-exercises.component.html',
  styleUrls: ['./add-exercises.component.scss'],
})
export class AddExercisesComponent  implements OnInit {
  exercises: Array<Exercise> = new Array<Exercise>;
  enteredValue: string = '';

  constructor(private storage: Storage, private storageService: StorageService) { }


  ngOnInit() {
    this.populateList();
  }

  populateList() {
    try {
      this.storageService.exerciseState().pipe(
        switchMap(res => {
          if (res) {
            return this.storageService.fetchExercises();
          } else {
            return of([]); // Return an empty array when res is false
          }
        })
      ).subscribe(data => {
        this.exercises = data; // Update the user list when the data changes
      });

    } catch(err) {
      throw new Error(`Error: ${err}`);
    }
  }

  addRow() {
    let exercise: Exercise = { name: this.enteredValue, additionalInfo: ''};
    this.storageService.addExercise(exercise);
    this.enteredValue = '';
  }

  deleteExercise(exercise: Exercise) {
    const idx = this.exercises.indexOf(exercise);
    this.exercises.splice(idx, 1);
  }
}
