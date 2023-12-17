import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { filter } from 'rxjs';
import { AnimatedLogoComponent } from 'src/app/shared/components/animated-logo/animated-logo.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzLayoutModule, NzBreadCrumbModule, NzMenuModule, NzIconModule, RouterLink, AnimatedLogoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  breadcrumbs: Array<{ label: string, url: string }> = [];
  isSmallScreen = false;
  private breakpointSubscription: Subscription;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private breakpointObserver: BreakpointObserver) {}


  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    });

    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map(result => result.matches))
      .subscribe(isSmallScreen => {
        this.isSmallScreen = isSmallScreen;
      });
  }

  createBreadcrumbs(route: ActivatedRoute, path: string = ''): Array<{ label: string, url: string }> {
    let breadcrumbs: Array<{ label: string, url: string }> = [];
    let currentRoute: ActivatedRoute = route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      const routeURL: string = currentRoute.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        const fullPath = path ? `${path}/${routeURL}` : `/${routeURL}`;
        const label = currentRoute.snapshot.params['id'] ? `${routeURL.split('/')[0]}/${currentRoute.snapshot.params['id']}` : routeURL;
        breadcrumbs.push({ label, url: fullPath });
      }
    }

    return breadcrumbs;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
