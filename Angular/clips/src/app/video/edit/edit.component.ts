import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';
import IClip from '../../models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from '../../services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;

  inSubmission = false;
  showAlert = false;
  alertColor = 'blue';

  alertMsg = 'Please wait! Updating clip.';

  @Output() update = new EventEmitter();

  // can be done this way too
  // private _activeClip: IClip | null = null;
  //
  // get activeClip(): IClip | null {
  //   return this._activeClip;
  // }
  //
  // @Input() set activeClip(value: IClip | null) {
  //   if (value) {
  //     if (value.docID) this.clipID.setValue(value.docID);
  //     this.title.setValue(value.title);
  //     this._activeClip = value;
  //   }
  // }

  clipID = new FormControl('', { nonNullable: true });
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });

  editForm = new FormGroup({ title: this.title, id: this.clipID });

  constructor(private modal: ModalService, private clipsService: ClipService) {}

  ngOnInit() {
    this.modal.register('editClip');
    if (this.activeClip) this.title.setValue(this.activeClip.title);
  }

  ngOnDestroy() {
    this.modal.unregister('editClip');
  }

  ngOnChanges() {
    if (!this.activeClip) {
      return;
    }

    this.inSubmission = false;
    this.showAlert = false;

    const docID = this.activeClip.docID;
    if (docID) this.clipID.setValue(docID);
    this.title.setValue(this.activeClip.title);
  }

  async submit() {
    if (!this.activeClip) {
      return;
    }

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating clip.';

    try {
      await this.clipsService.updateClip(this.clipID.value, this.title.value);
    } catch (e) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong. Try again later.';
      return;
    }

    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success!';
  }
}
