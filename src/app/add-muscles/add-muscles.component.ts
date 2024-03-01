import { Component, OnInit } from '@angular/core';
import { MuscleDto } from '../interfaces/muscle.dto.interface';
import { Muscle } from '../interfaces/muscle.interface';
import { MuscleStorageService } from '../services/muscle.storage.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-muscles',
  templateUrl: './add-muscles.component.html',
  styleUrls: ['./add-muscles.component.scss'],
})
export class AddMusclesComponent  implements OnInit {

  muscles: MuscleDto[] = []
  enteredValue: string = ''

  constructor(private storage: MuscleStorageService) { }

  ngOnInit() {
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
        this.muscles = data; // Update the user list when the data changes
      });

    } catch(err) {
      throw new Error(`Error: ${err}`);
    }
  }

  addRow() {
    let muscle: Muscle = {name: this.enteredValue};
    this.storage.add(muscle)
    this.enteredValue = ''
  }

  deleteMuscle(muscle: MuscleDto) {
    this.storage.deleteById(muscle)
  }

}
