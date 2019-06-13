import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
    isCollapsed = true;
    activeUrl: string;
    
    constructor(private router: Router) {
        router.events.subscribe((val: NavigationEnd) => {
            this.activeUrl = val.url;
        });
    }

    ngOnInit() {
    }
}
