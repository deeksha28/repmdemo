import { Component, OnInit, Input } from '@angular/core';
import { SVGKEYS } from '../../shared/components/interfaces/shared.interface';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { TabService } from '../../tab.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() showLabels: boolean;
  overviewKey = SVGKEYS.OVERVIEW;
  qccapexKey = SVGKEYS.QCCAPEX;
  proftitnlossKey = SVGKEYS.PROFITNLOSS;
  hedonicKey = SVGKEYS.HEDONIC;
  documanagerKey = SVGKEYS.DOCUMANAGER;
  dcfKey = SVGKEYS.DCF;
  ratingKey = SVGKEYS.RATING;
  creditApplicationKey = SVGKEYS.CREDITAPPLICATION;
  hkBkKey = SVGKEYS.HKBK;
  dashboardKey = SVGKEYS.DASHBOARD;
  importDataKey = SVGKEYS.IMPORTDATA;
  clonePropertyKey = SVGKEYS.CLONEPROPERTY;
  masterdataKey = SVGKEYS.MASTERDATA;
  rentermirrorKey = SVGKEYS.RENTERMIRROR;
  budgetKey = SVGKEYS.BUDGET;
  processstepperKey = SVGKEYS.PROCESSSTEPPER;
  mapKey = SVGKEYS.MAP;
  public  = 0;
  public portfolioId = 0;
  propertyId = 0;
  public svgHeight = 25;
  selectedView;
  view;
  viewPortfolio;
  public svgFillColorArr = [
    '#ff9800',
    '#7e57c2',
    '#26a69a',
    '#00bcd4',
    '#4caf50',
    '#e57373',
    '#ab47bc',
    '#3f51b5',
    '#ff7043',
    '#ff7043',
    '#673ab7',
    '#795548',
    '#f06292',
    '#9e9d24',
    '#005684',
    '#0097a7',
    '#c0ca33',
    '#5c6bc0',
    '#fbc02d'
  ];
  
  constructor(private router: Router, private ds: DataService,private tabService: TabService) { 
    this.selectedView = "overview"
    this.ds.view.subscribe((value) => {
      this.view = value
    })

    this.ds.portfolioToggle.subscribe((value) => {
      this.viewPortfolio = value
    })
  }

  ngOnInit(): void {
  }

  public navigate(selectedView: string, level: string, path: string) {   
    
    if (level === 'portfolio') {
      this.portfolioId = this.ds.getPortfolioId();
      this.tabService.addTab(path,this.portfolioId);
      path = path + this.portfolioId;
    } else if (level === 'property') {
      this.propertyId = this.ds.getPropertyId();
      this.tabService.addTab(path,this.propertyId);
      path = path + this.propertyId;
    }
    this.selectedView = selectedView;
    this.router.navigate([path]);
  }

  public selectView(selectedView) {
    
  }

  openTab(url: string) {
    this.tabService.addTab(url,(this.portfolioId+1));
    this.router.navigateByUrl(url+ (this.portfolioId+1));
  }
}
