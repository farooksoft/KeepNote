import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit, OnDestroy {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  constructor(private matDialogRef: MatDialogRef<EditNoteViewComponent>,
    private routeService: RouterService,
    private notesService: NotesService,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.note = this.notesService.getNoteById(this.data.note);
  }

  ngOnDestroy() {
    this.routeService.routeBack();
  }

  onSave() {
    this.notesService.editNote(this.note).subscribe((editedNote) => {
      this.matDialogRef.close();
    },
      (err: any) => {
      this.errMessage = err.message;
    });
  }
}
