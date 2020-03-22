import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'aptm-dual-slider',
  templateUrl: './dual-slider.component.html',
  styleUrls: ['./dual-slider.component.scss']
})
export class DualSliderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('slider') sliderElement: ElementRef;
  @ViewChild('track') sliderTrack: ElementRef;
  @ViewChild('startThumb') startThumbElement: ElementRef;
  @ViewChild('endThumb') endThumbElement: ElementRef;

  @Input() minRange = 0;
  @Input() maxRange = 100000;
  @Input() sliderLabel;
  sliderWidth = 300;
  thumbWidth = 15;
  startThumbValue = 70;
  endThumbValue = 120;
  sliderRange;
  sliderStep;

  @Output() valueChange = new EventEmitter();

  constructor(private renderer: Renderer2) {
    // this.sliderRange = this.maxRange - this.minRange;
    // this.sliderStep = this.sliderWidth / this.sliderRange;
  }

  ngOnInit() {
    this.setRange();
  }

  setRange(minValue?, maxValue?) {

    this.sliderRange = this.maxRange - this.minRange;
    this.sliderStep = this.sliderWidth / this.sliderRange;

    this.startThumbValue = (minValue && minValue >= this.minRange) ? minValue : this.minRange;
    this.endThumbValue = (maxValue && maxValue <= this.maxRange) ? maxValue : this.maxRange;

  }

  ngAfterViewInit() {
    this.positionEndPoints();
  }

  positionEndPoints() {
    this.renderer.setStyle(this.sliderElement.nativeElement, 'paddingLeft',
      (this.startThumbValue - this.minRange) * this.sliderStep + 'px');
    this.renderer.setStyle(this.sliderElement.nativeElement, 'paddingRight',
      this.sliderWidth - this.endThumbValue * this.sliderStep + 'px');


    this.renderer.setStyle(this.sliderTrack.nativeElement, 'width',
      (this.endThumbValue - this.startThumbValue) * this.sliderStep + 'px');

    this.renderer.setStyle(this.startThumbElement.nativeElement, 'left',
      (this.startThumbValue - this.minRange) * this.sliderStep - (this.thumbWidth / 2) + 'px');
    this.renderer.setStyle(this.endThumbElement.nativeElement, 'left',
      (this.endThumbValue - this.minRange) * this.sliderStep - (this.thumbWidth / 2) + 'px');
  }

  allowDrop(event) {
    event.preventDefault();
  }

  onDrop(event) {
    event.preventDefault();
  }

  dragStartThumb(sliderElement, event) {
    event.preventDefault();
    const thumbValue = this.getThumbValue(sliderElement, event);
    if (thumbValue < this.endThumbValue &&
      thumbValue >= this.minRange) {
      this.startThumbValue = thumbValue;
      this.renderer.setStyle(this.startThumbElement.nativeElement, 'left',
        (this.startThumbValue - this.minRange) * this.sliderStep - (this.thumbWidth / 2) + 'px');
      this.renderer.setStyle(this.sliderElement.nativeElement, 'paddingLeft',
        (this.startThumbValue - this.minRange) * this.sliderStep + 'px');
      this.renderer.setStyle(this.sliderTrack.nativeElement, 'width',
        (this.endThumbValue - this.startThumbValue) * this.sliderStep + 'px');

      this.valueChange.emit({minValue: this.startThumbValue, maxValue: this.endThumbValue});
    }
  }

  dragEndThumb(sliderElement, event) {
    event.preventDefault();
    const thumbValue = this.getThumbValue(sliderElement, event);
    if (thumbValue > this.startThumbValue &&
      thumbValue <= this.maxRange) {
      this.endThumbValue = thumbValue;
      this.renderer.setStyle(this.endThumbElement.nativeElement, 'left',
        (this.endThumbValue - this.minRange) * this.sliderStep - (this.thumbWidth / 2) + 'px');
      this.renderer.setStyle(this.sliderElement.nativeElement, 'paddingRight',
        this.sliderWidth - this.endThumbValue * this.sliderStep + 'px');
      this.renderer.setStyle(this.sliderTrack.nativeElement, 'width',
        (this.endThumbValue - this.startThumbValue) * this.sliderStep + 'px');

      this.valueChange.emit({minValue: this.startThumbValue, maxValue: this.endThumbValue});
    }
  }

  onDragEnd(event) {
    event.target.classList.remove('dragging');
    event.preventDefault();
  }

  getThumbValue(elmt, evt): number {
    const leftMark = Math.round(evt.clientX - elmt.getBoundingClientRect().left);
    return Math.round(leftMark / this.sliderStep) + this.minRange;
  }

  ngOnDestroy() {
  }

}
