import { Component, OnInit } from '@angular/core';

// services
import { MenuService } from 'src/app/services/menu.service';

@Component({
    selector: 'app-gerenciar-menu',
    templateUrl: './gerenciar-menu.component.html'
})

export class GerenciarMenuComponent implements OnInit {
    datas: [];
    constructor(private menuService: MenuService) {

    }

    ngOnInit() {
        this.getAll();
    }

    getAll(): void {        
        this.menuService.getAll()
            .subscribe((response: any) => {   
                this.datas = response;

                // if (this.length === 0) {
                //     this.showMessage = true;
                //     this.hasSearch = false;
                //     if (this.filterValue) {
                //         this.noItems = true;
                //     }
                // } else {
                //     this.hasSearch = true;
                //     this.noItems = true;
                //     this.showMessage = false;

                //     setTimeout(() => {
                //         Observable.fromEvent(this.searchTextRef.nativeElement, 'keyup')
                //             .map((evt: any) => evt.target.value)
                //             .debounceTime(800)
                //             .distinctUntilChanged()
                //             .subscribe((text: string) => this.applyFilter(text));
                //     });
                // }
            }, (erro) => {
                // this.showMessage = true;
                // this.hasSearch = false;
            });
    }
}