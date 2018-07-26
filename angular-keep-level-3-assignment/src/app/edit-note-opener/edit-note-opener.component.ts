import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {

  constructor(private dialog: MatDialog,
    private route: ActivatedRoute) {
    const noteId = +this.route.snapshot.paramMap.get('noteId');
    const editDialog = this.dialog.open(EditNoteViewComponent, {
      data: {
        note: noteId,
      }
    });
   }
}
