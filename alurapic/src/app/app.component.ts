import { filter, map, switchMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private titleService: Title
  ) {}
  ngOnInit(): void {
    this.router.events
      //filter para pegar o evento NavigationEnd
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activateRoute))
      .pipe(
        //map para ver qual rota esta sendo acessada no momento
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
      )
      //switchMap para desconsiderar a função anterior e extrair o data da rota e setar o title
      .pipe(switchMap((route) => route.data))
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }
}
