import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class ExportImportServiceService {

  constructor() { }

  async writeSecretFile() {
    await Filesystem.writeFile({
      path: 'text.txt',
      data: 'This is a test',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    })
    .then((data) => {
      // console.log('Second callback:', data);
      // Additional logic for the second callback
      // this.exercises.push({ name: `${data.uri} - write success`});
      
    })
    .catch((error) => {
      // console.error('Error:', error);
      // Handle errors
      // this.exercises.push({ name: `${error.error} - write error`});
    });
  };
  
  async readSecretFile() {
    const contents = await Filesystem.readFile({
      path: 'text.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    })
    .then((data) => {
      // console.log('Second callback:', data);
      // Additional logic for the second callback
      // this.exercises.push({ name: `${data.data} - read success`});
      
    })
    .catch((error) => {
      // console.error('Error:', error);
      // Handle errors
      // this.exercises.push({ name: `${error.error} - read error`});
    });
  
    // console.log('secrets:', contents);
    // this.enteredValue = contents.data.toString();
  };
  
  async deleteSecretFile() {
    await Filesystem.deleteFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
    });
  };
  
  async readFilePath() {
    // Here's an example of reading a file with a full file path. Use this to
    // read binary data (base64 encoded) from plugins that return File URIs, such as
    // the Camera.
    const contents = await Filesystem.readFile({
      path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt',
    });
  
    // console.log('data:', contents);
  };
}
