import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  note: Note;
  errMessage: string;

  constructor(private notesService: NotesService) {
    this.note = new Note();
  }

  ngOnInit() {
  }

  takeNotes() {
    if (this.note.title !== '' && this.note.text !== '') {
      this.notesService.addNote(this.note).subscribe(
        data => {},
        err => {
          this.errMessage = err.message;
        }
      );
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }

}
