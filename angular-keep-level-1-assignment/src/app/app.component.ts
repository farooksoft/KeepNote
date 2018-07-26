import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  note: Note = new Note();
  notes: Array<Note> = [];
  errMessage: string;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      err => this.errMessage = err.message
      );
  }

  takeNotes() {
    if (this.note.title !== '' && this.note.text !== '') {
      this.notes.push(this.note);
      this.notesService.addNote(this.note).subscribe(
        data => {},
        err => {
          const index: number = this.notes.findIndex(note => note.title === this.note.title);
          this.notes.splice(index, 1);
          this.errMessage = err.message;
        }
      );
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
}
