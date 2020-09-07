import { Injectable } from '@angular/core';
import { ITAB } from './itab';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  tabs: ITAB[] = [];
  activeUrl;
  tabOptions: ITAB[] = [
    { name: 'overview', path: '/overview' , tabId: '',url: ''}, 
    { name: 'constructionPlanning', path: '/constructionplanning/portfolio/' , tabId: '',url: '' },
    { name: 'characteristics', path: '/characteristics/property/' ,  tabId: '',url: '' },  
    { name: 'rent-roll', path: '/rent/property/' ,  tabId: '' ,url: ''},  
    { name: 'budget', path: '/budget/property/' ,  tabId: '',url: '' },      
    { name: 'process', path: '/process/property/' ,  tabId: '' ,url: ''},      
    { name: 'rating', path: '/rating/property/' ,  tabId: '' ,url: ''},      
    { name: 'profitAndLoss', path: '/profitAndLoss/portfolio/' ,  tabId: '',url: '' }, 
    { name: 'profitAndLoss', path: '/profitAndLoss/property/' ,  tabId: '',url: '' }, 
    { name: 'qualicasa', path: '/qualicasa/portfolio/' ,  tabId: '',url: '' }, 
    { name: 'qualicasa', path: '/qualicasa/property/' ,  tabId: '' ,url: ''}, 
    { name: 'hedonic', path: '/hedonic/portfolio/' ,  tabId: '' ,url: ''}, 
    { name: 'hedonic', path: '/hedonic/property/' ,  tabId: '' ,url: ''},
    { name: 'tasks',   path: '/tasks' ,  tabId: '' ,url: ''},
    { name: 'DCF',   path: '/dcf/portfolio/',  tabId: '' ,url: ''},
    { name: 'DCF',   path: '/dcf/property/',  tabId: '',url: '' }
  ];
 
  constructor() { }

  addTab(path: string,id = null) {
    const tab = this.getTabOptionByPath(path);
    if(id!=null){
      if (!this.tabs.includes(tab)) {
        tab.tabId = tab.path + id;
        tab.url = tab.tabId;
        this.tabs.push(tab);
        this.activeUrl = tab.path  + id
      }
      else if (this.tabs.includes(tab)){
        var duplicateTabs = this.tabs.filter(tab => tab.path == tab.path)
        var tabCopy = {...tab};
        tabCopy.tabId = tabCopy.path + id + '/' + (duplicateTabs.length + 1);
        tabCopy.url = tabCopy.path + id
        this.tabs.push(tabCopy);
        this.activeUrl = tabCopy.path  + id + '/' + (duplicateTabs.length + 1);
      }
    }
    else{
      if (!this.tabs.includes(tab)) {
        tab.tabId = tab.path;
        tab.url = tab.tabId;
        this.tabs.push(tab);
        this.activeUrl = tab.url;
       // this.activeUrl = tab.url + '/' + id;
      }
      // else if (this.tabs.includes(tab)){
      //   var duplicateTabs = this.tabs.filter(tab => tab.url == tab.url)
      //   var tabCopy = {...tab};
      //   tabCopy.id = duplicateTabs.length + 1;
      //   this.tabs.push(tabCopy);
      //   this.activeUrl = tabCopy.url + '/' + tabCopy.id
      // }
    }
  }
   
  getTabOptionByPath(path: string): ITAB {
    return this.tabOptions.find(tab => tab.path === path);
  }
  
  getActiveUrl(){
    return this.activeUrl;
  }
  deleteTab(index: number) {
    this.tabs.splice(index, 1);
  }
}


