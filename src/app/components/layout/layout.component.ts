import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { TabService } from '../../tab.service';
import { Router, NavigationEnd, ActivatedRoute   } from '@angular/router';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public redirectURL = environment.redirectingURL;
  public showLabels = true;
  public showPortfolio = false;
  viewPortfolio: boolean = false
  tabs = [];
 

  constructor(private ds: DataService,public tabService: TabService, private router : Router, private activatedRoute : ActivatedRoute) { 
    this.ds.portalSubject.next(false)   
    let url = this.activatedRoute.snapshot['_routerState'].url;
    this.tabService.refreshURL(url); 
  }

  ngOnInit(): void {
    this.ds.portfolioToggle.subscribe((value) => {
      this.viewPortfolio = value
    })
    this.tabs = this.tabService.tabs;   
    this.setHeaderPropertyLabel(this.router.url);
  }

  toggleViewLabels() {
    this.showLabels = !this.showLabels;
  }

  toggleViewPortfolio() {
    this.showPortfolio = !this.showPortfolio;
  }
  closeTab(index: number, event: Event) {
    var activeTabId = document.getElementsByClassName('nav-link active')[0].getAttribute('id');
    var deleteTabId = this.tabs[index].tabId;
    this.tabService.deleteTab(index);

    if(this.tabService.getTab().length == 0){
      this.tabService.addTab('/overview')
      this.router.navigate(['/overview']);
    }
    
    else if(activeTabId == deleteTabId){
      this.router.navigateByUrl(this.tabs[0].url)
      this.setHeaderPropertyLabel(this.tabs[0].url)
    }
    
    event.preventDefault();
    console.log(this.tabService.activeUrl);
  }
  onTabChange(event) {
    var url = this.tabs.find(tab=>tab.tabId == event.nextId).url;  
    this.setHeaderPropertyLabel(url)
    this.router.navigateByUrl(url);
    this.router.navigateByUrl(url);
  }

  private setHeaderPropertyLabel(url){
    // var url = this.tabs.find(tab=>tab.tabId == event.nextId).url;
     if(url.split('/')[2]!=undefined){
       var propertyId = url.split('/')[3];
       if(url.split('/')[2]=='property'){
         var property;
         this.ds.headerTypeSubject.next('property')
         this.ds.viewSubject.next('property')
         property = this.ds.bgvPortfolio.find(prop=>prop.id == propertyId);
         this.ds.setPortfolioId(0);
         if(property==undefined){
           this.ds.setPortfolioId(1);
           property = this.ds.offeredPortfolio.find(prop=>prop.id == propertyId)
         }
         if(property!=undefined) this.ds.headerSubject.next(property.id + property.name);
       }
       else{
         this.ds.setPortfolioId(propertyId);
         this.ds.headerTypeSubject.next('portfolio')
         this.ds.viewSubject.next('portfolio')
         this.ds.headerSubject.next(this.ds.portfolios[propertyId])
       }
     }
     else{
       this.ds.headerTypeSubject.next('portfolio')
       this.ds.viewSubject.next('portfolio')
       this.ds.headerSubject.next(this.ds.portfolios[this.ds.getPortfolioId()])
     }   
  }

  
}
