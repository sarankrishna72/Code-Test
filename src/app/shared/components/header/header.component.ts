import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  // logout 
  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
  }

}
