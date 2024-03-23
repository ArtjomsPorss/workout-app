import { Component, OnInit } from '@angular/core';
import { Exercise } from '../interfaces/exercise.interface';
import { ExcerciseStorageService } from '../services/excercise.storage.service';
import { of, switchMap } from 'rxjs';
import { ExerciseDto } from '../interfaces/exercise.dto.interface';

@Component({
  selector: 'app-add-exercises',
  templateUrl: './add-exercises.component.html',
  styleUrls: ['./add-exercises.component.scss'],
})
export class AddExercisesComponent implements OnInit {
  exercises: Array<ExerciseDto> = new Array<ExerciseDto>;
  enteredValue: string = ''
  descriptionText: string = ''



  constructor(private storage: ExcerciseStorageService) { }


  ngOnInit() {
    this.populateList();
  }

  populateList() {
    try {
      this.storage.state().pipe(
        switchMap(res => {
          if (res) {
            return this.storage.fetch();
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

  addRow() {
    if (!this.enteredValue) { return }
    let exercise: Exercise = { name: this.enteredValue, additionalInfo: this.descriptionText };
    this.storage.add(exercise);
    this.enteredValue = '';
    this.descriptionText = '';
  }

  deleteExercise(exercise: ExerciseDto) {
    this.storage.deleteById(exercise)
  }
}
