import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

declare var swal: any;
import * as _ from 'lodash';

// Components
import { MenuModalComponent } from '../menu-modal/menu-modal.component';

// services
import { MenuService } from 'src/app/services/menu.service';

@Component({
    selector: 'app-gerenciar-menu',
    templateUrl: './gerenciar-menu.component.html'
})

export class GerenciarMenuComponent implements OnInit {
    datas: [];
    constructor(private menuService: MenuService, public dialog: MatDialog) {

    }

    ngOnInit() {
        this.getAll();
    }

    getAll(): void {
        this.menuService.getAll()
            .subscribe((response: any) => {
                this.datas = _.sortBy(response, [function (x) { return x.name; }]);
            }, (erro) => {
                console.log(erro);
            });
    }

    openModal(id?, title?, item?, index?): void {
        const dialogRef = this.dialog.open(MenuModalComponent, {
            width: '800px',
            data: { id: id, title: title, item: item, index: index }
        });

        dialogRef.afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getAll();
                }
            });
    }

    delete(data: any, type: string, indexSubMenu: number, indexLink: number) {
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
                        return this.menuService.delete(data._id)
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
                        data.items.splice(indexSubMenu, 1);
                    } else {
                        data.items[indexSubMenu].listItem.splice(indexLink, 1);
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