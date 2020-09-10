import { Component, OnInit } from '@angular/core';
import { SVGKEYS } from '../interfaces/shared.interface';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prev-next',
  templateUrl: './prev-next.component.html',
  styleUrls: ['./prev-next.component.scss']
})
export class PrevNextComponent implements OnInit {
  public previousKey = SVGKEYS.PREVIOUS;
  public nextKey = SVGKEYS.NEXT;
  public svgHeight = 14;
  public svgFillColor = '#fff'; // '#005684';
  public header: string;
  public headerType: string;

  selectedView;
  constructor(private router: Router,private ds: DataService) {
    this.ds.header.subscribe((value) => {
      this.header = value
    })
        this.ds.headerType.subscribe((value) => {
          this.headerType = value;
        });
  }

  ngOnInit(): void {
  }

  public navigate(selectedView: string, level: string, path: string) {   
    if(selectedView != 'portfolio'){
      this.selectedView = selectedView
      this.router.navigate([path])
    }else{
      this.ds.portfolioToggleSubject.next(!this.ds.portfolioToggleSubject.getValue())
    }   
  }

  showPrevNext() {
    return this.ds.headerTypeSubject.getValue() == 'property';
  }
}
