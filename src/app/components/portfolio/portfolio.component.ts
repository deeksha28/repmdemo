import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @Input() showPortfolio: boolean;
  portfolio;
  public showLabels = true;
  public showLess = true;
  zipTown = 0;
  canton = 0;
  category = 0;
  selectedRowId = 0;
  public selectedPortfolioId;
  portfolioId = 0;
  level = 4;
  properties : any;
  selectedView;
  filteredProperties : any;

  public portfolios;
  public selectedPortfolio;

  constructor(private router: Router,private ds: DataService) {     
  }

  ngOnInit(): void {
    this.selectedPortfolioId = this.ds.getPortfolioId();
    this.portfolios = this.ds.portfolios;
    this.selectedPortfolio  = this.portfolios[this.selectedPortfolioId];  
    if(this.ds.getPortfolioId() != 1)
      this.properties = this.ds.bgvPortfolio;
    else {
      console.log("ss")
      this.properties = this.ds.offeredPortfolio;
    }

    this.ds.header.subscribe((value) => {
      if(value){
        this.selectedRowId = isNaN(parseInt(value.split('-')[0]))?0:parseInt(value.split('-')[0]);
        this.level = 3;
      }
        

           
      if(!(this.ds.headerTypeSubject.value == 'property')){
        this.ds.headerTypeSubject.next('portfolio')
        this.ds.viewSubject.next('portfolio')
        this.level = 4;       
      }    
    })     
    this.assignCopy();
  }

  ngAfterViewChecked(): void{
    if(document.getElementById('propertyTree')){
      var logoElementWidth = document.getElementById('mainSiteHeader')?document.getElementById('mainSiteHeader').children[0].clientWidth:0
      var topElementHeight = document.getElementsByClassName('container')[0]?document.getElementsByClassName('container')[0].clientHeight + 2:0;
      var treeWidth = document.getElementById('propertyTree').offsetWidth;
      var propertyLabelWidth = document.getElementById('mainSiteHeader')?document.getElementById('mainSiteHeader').children[1].children[0].scrollWidth:0
      document.getElementById('propertyTree').style.left = (logoElementWidth + propertyLabelWidth) - document.getElementsByClassName('topbar-label')[0].scrollWidth + 'px';
      document.getElementById('propertyTree').style.top = (topElementHeight) + 'px';
    }
  }

  toggleViewLabels() {
    this.showLabels = !this.showLabels;
  }
  toggleShowLess() {
    this.showLess = !this.showLess;
  }
  choosePortfolio(event){
    if(event.target.value == 1)
      this.properties = this.ds.offeredPortfolio;
    else
      this.properties  = this.ds.bgvPortfolio;
    this.ds.setPortfolioId(event.target.value)
    this.ds.headerTypeSubject.next('portfolio')
    this.ds.viewSubject.next('portfolio')
    this.ds.headerSubject.next(this.portfolios[event.target.value])
    
    this.selectedPortfolio = event.target.options[event.target.options.selectedIndex].text
    this.assignCopy();
  }
  selectPortfolio(){
    this.level = 4;
    this.portfolioId = this.ds.getPortfolioId();
    this.ds.portfolioToggleSubject.next(!this.ds.portfolioToggleSubject.getValue())
    this.ds.headerTypeSubject.next('portfolio')
    this.ds.viewSubject.next('portfolio')
    this.ds.headerSubject.next(this.portfolios[this.portfolioId])
  }
  selectProp(id, name){
    this.level = 3;
    this.selectedRowId = id;
    this.ds.setPropertyId(id)
    this.ds.headerTypeSubject.next('property')
    this.ds.portfolioToggleSubject.next(!this.ds.portfolioToggleSubject.getValue())
    this.ds.viewSubject.next('property')
    this.ds.headerSubject.next(id + name)
  }

  assignCopy(){
    this.filteredProperties = Object.assign([], this.properties);
  }

  filterItem(value){
    var isFiltered = false;
    if(this.category == 1 || this.category == 2){
      this.filteredProperties = Object.assign([], this.properties).filter(
        item => item.category.indexOf(this.category) > -1
      )
      isFiltered = true;
    }
    if(parseInt(this.canton.toString().split(":")[0]) > 0){
      this.filteredProperties = Object.assign([], this.filteredProperties).filter(
        item => item.canton == this.canton.toString().split(":")[0]
      )
      isFiltered = true;
    }
    if(parseInt(this.zipTown.toString().split(":")[0]) > 0){
      this.filteredProperties = Object.assign([], this.filteredProperties).filter(
        item => item.zipTown == this.zipTown.toString().split(":")[0]
      )
      isFiltered = true;
    } 
    else if(!isFiltered)
      this.assignCopy();
  }
  public navigate(selectedView: string, level: string, path: string) {   
      this.ds.portfolioToggleSubject.next(!this.ds.portfolioToggleSubject.getValue())
  }
}
