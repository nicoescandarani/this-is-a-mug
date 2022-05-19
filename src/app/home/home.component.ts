import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  height$: BehaviorSubject<number> = new BehaviorSubject(0);
  renderCanvas = false;

  get height(): number {
    return this.height$.value;
  }

  set height(value: number) {
    this.height$.next(value);
  }

  colors: string[] = [
    '#9665ff',
    '#4ef9a9',
    '#f94e70',
    '#fff64d',
    '#ff854d',
    '#ff4de7',
    '#3d64ff',
    // '#cfd8ff'
  ];
  selectedColor = this.colors[0];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const documentWidth = window.innerWidth;
    const documentHeight = window.innerHeight;
    // ! If mobile.
    if ((documentWidth < 680) || (documentWidth < 900 && documentHeight < 500)) {
      const documentHeight = window.innerHeight;
      const colors = document.getElementById('colors');
      const selector = document.getElementById('selector');
      const colorsHeight = colors?.clientHeight;
      const selectorHeight = selector?.clientHeight;
      // ! Set the result height to be the difference between the colors element and the documents height.
      // ! Then substract the padding.
      let resHeight = 0;
      // ! If vertical mobile.
      if (!(documentWidth < 900 && documentHeight < 500)) {
        resHeight = (colorsHeight ? documentHeight - colorsHeight : 0) - 40;
      } else {
        // ! If horizontal mobile.
        if (selector) {
          selector.style.alignContent = 'center';
          selector.style.margin = '0px';
          selector.style.height = '100%';
        }
        resHeight = 0;
      }
      // ! Set the result.
      this.height$.next(resHeight);
    }
    this.renderCanvas = true;
    this.cd.detectChanges();
  }

  lightenDarkenColor(colorCode: string, amount: number): string {
    let usePound = false;

    if (colorCode[0] == "#") {
      colorCode = colorCode.slice(1);
      usePound = true;
    }

    const num = parseInt(colorCode, 16);

    let r = (num >> 16) + amount;

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }

    let b = ((num >> 8) & 0x00FF) + amount;

    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }

    let g = (num & 0x0000FF) + amount;

    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }
}
