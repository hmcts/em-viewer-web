import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AnnotationService, Note} from '../annotations/annotation.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @ViewChild('notesForm') notesForm;
  private _page = 1;
  @Input() numPages = 0;
  @Input() url;

  notes: Note[] = [];
  private _currentNote = '';

  constructor(private annotationService: AnnotationService) { }

  ngOnInit() {
    this.annotationService.getNotes(this.url).then(notes => {
      this.notes = notes;
      this.page = this._page;
    }).catch(console.log);
  }

  @Input() set page(value: number) {
    this._page = value;
    if (!this.notes[this._page - 1]) {
      this.notes[this._page - 1] = new Note();
    }
    this.currentNote = this.notes[this._page - 1].content;
  }

  get page(): number {
    return this._page;
  }

  set currentNote(value: string) {
    this._currentNote = value;
    this.notes[this._page - 1].content = this._currentNote;
  }

  get currentNote(): string {
    return this._currentNote;
  }

  save() {
    this.annotationService.saveNotes(this.notes).then(() => {
      this.notesForm.form.markAsPristine();
    });
  }
}
