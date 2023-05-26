import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class ClipComponent implements OnInit {
  // by setting static as true, view child will update this property with the element before ngoninit is called
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;

  player?: videojs.Player;

  clip?: IClip;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.player = videojs(this.target?.nativeElement);

    this.route.data.subscribe((data) => {
      this.clip = data.clip as IClip;

      this.player?.src({ src: this.clip.url, type: 'video/mp4' });
    });
  }
}
