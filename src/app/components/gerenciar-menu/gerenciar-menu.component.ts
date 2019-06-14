import { Component, OnInit } from '@angular/core';
declare var swal: any;

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

    delete(_id: string, type: string, index: number) {
        swal({
            text: `Deseja realmente apagar ${type}?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Apagar',
            cancelButtonText: 'Cancelar',
            closeOnConfirm: false,
            closeOnCancel: false
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    if (type == 'menu principal') {
                        return this.menuService.delete(_id)
                            .subscribe((data: any) => {
                                if (data) {
                                    swal({
                                        text: `${type} apagado com sucesso!`,
                                        type: 'success'
                                    }).then(() => {
                                        this.getAll();
                                    });
                                }
                            }, () => {
                                this.getAll();
                            });
                    } else if (type == 'subitem') {

                    } else {

                    }

                    const request = this.datas;
                    this.menuService.createOrUpdateMenu(request)
                        .subscribe((response) => {
                            swal({
                                text: `${type} apagado com sucesso!`,
                                type: 'success'
                            }).then(() => {
                                this.getAll();
                            });
                        }, (error) => {
                            swal({
                                text: 'Erro para atualizar menu!',
                                type: 'error'
                            });
                        });
                }
            });
    }
}