import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileHandle } from './_model/file.handle.model';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  file!: File | null;
  url!: SafeUrl | null;
  @Output() files:EventEmitter<FileHandle>=new EventEmitter();
  @HostBinding("style.background") private background="#eee";

  constructor(private sanitizer:DomSanitizer) { }
  @HostListener("dragover",["$event"])
  public onDragOver(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#999";
  }
  @HostListener("dragLeave",["$event"])
  public onDragLeave(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";
  }
@HostListener("drop",["$event"])
  public onDrop(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";

    

    let fileHandle: FileHandle | null = null;
   
    const file = evt.dataTransfer?.files[0];
    if (file) {
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      fileHandle = {
        file: file,
        url: url
      };
      this.files.emit(fileHandle);
    } else {
      // Handle the case where file is undefined, if necessary
      console.error('No file found in the data transfer.');
    }
  

  }





}
