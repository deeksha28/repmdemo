import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private ds: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  goToOverview() {
    this.ds.portalSubject.next(false);
    this.router.navigate(['/overview']);
  }
}
