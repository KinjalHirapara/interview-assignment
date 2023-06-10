import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  deleteButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  emitDeleteButtonClick(): void {
    this.deleteButtonClicked.emit();
  }
}
