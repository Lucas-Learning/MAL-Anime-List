import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MainPage } from '../main-page/main-page';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  constructor(public mainPage: MainPage) {}
  @Output() close = new EventEmitter<void>();
  closeModal(): void{
    this.close.emit();
  }
}
