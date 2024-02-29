import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.interface';
import { Storage } from '@ionic/storage-angular';
// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-add-exercises',
  templateUrl: './add-exercises.component.html',
  styleUrls: ['./add-exercises.component.scss'],
})
export class AddExercisesComponent  implements OnInit {
  exercises: Array<Exercise> = new Array<Exercise>;
  enteredValue: string = '';

  constructor(private storage: Storage) { }


  ngOnInit() {
    // this.initStorage();
    this.populateList();
  }

  // async initStorage() {
  //   await this.storage.create();
  // }

  populateList() {
    this.storage.get('exercises').then((data: Exercise[] | null) => {
      if (data) {
        this.exercises = data;
      }
    });
  }

  addRow() {
    this.exercises.push({ name: this.enteredValue, emphasis: null, additionalInfo: null});
    this.storage.set('exercises', this.exercises);
    this.enteredValue = '';
    // this.writeSecretFile();
    // this.readSecretFile();
  }

  deleteExercise(exercise: Exercise) {
    const idx = this.exercises.indexOf(exercise);
    this.exercises.splice(idx, 1);
    this.storage.set('exercises', this.exercises);
  }
}
