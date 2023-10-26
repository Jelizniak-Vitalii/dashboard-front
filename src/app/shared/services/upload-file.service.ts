import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  getFileData(event: any) {
    const fileNameTokens = event.target.files[0].name.split('.');
    const fileExtension = fileNameTokens.pop();
    const name = fileNameTokens.join('.');
    const FILE = event.target.files[0];
    return {
      name,
      extension: fileExtension,
      src: URL.createObjectURL(FILE),
      file: FILE
    };
  }
}
