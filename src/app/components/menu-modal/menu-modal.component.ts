import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';

// Services
import { MenuService } from 'src/app/services/menu.service';

@Component({
    selector: 'app-menu-modal',
    templateUrl: './menu-modal.component.html',
    providers: [FormBuilder]
})

export class MenuModalComponent implements OnInit {
    form: FormGroup;
    dialog: MatDialogRef<MenuModalComponent>;
    nameIcon: string;
    icons = ['fa-glass', 'fa-music', 'fa-search', 'fa-envelope-o', 'fa-heart', 'fa-star', 'fa-star-o', 'fa-user',
        'fa-film', 'fa-th-large'];

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<MenuModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private menuService: MenuService) {

        this.form = formBuilder.group({
            _id: null,
            name: [null, Validators.required],
            icon: [null, Validators.required]
        });

    }

    ngOnInit() {
        if (this.data && this.data.item && this.data.item.id && !this.data.isNew) {
            this.menuService.getById(this.data.item.id)
                .subscribe((response: any) => {
                    const data: any = {};
                    switch (this.data.title) {
                        case 'Sub-item':
                            data.name = response.items[this.data.indexEdit].item.name;
                            data.icon = response.items[this.data.indexEdit].item.icon;
                            break;
                        case 'link':
                            data.name = response.items[this.data.index].listItem[this.data.indexEdit].name;
                            data.icon = response.items[this.data.index].listItem[this.data.indexEdit].icon;
                            break;
                        default:
                            data.name = response.name;
                            data.icon = response.icon;
                            break;
                    }

                    data._id = response.id;
                    this.fillModal(data);
                });
        }
        this.dialog = this.dialogRef;
    }

    saveOrUpdate(id: number): void {
        if (!this.form.valid) {
            return;
        }

        let request = this.form.value;
        if (this.data.title == 'Sub-item' || this.data.title == 'link') {
            if (!this.data.item.items) {
                this.data.item.items = [];
            }

            if (this.data.title == 'Sub-item') {
                if (this.data.isNew) {
                    this.data.item.items.push({ item: { name: request.name, icon: request.icon } });
                } else {
                    this.data.item.items[this.data.indexEdit].item.name = request.name;
                    this.data.item.items[this.data.indexEdit].item.icon = request.icon;
                }
            } else {
                if (!this.data.item.items[this.data.index].listItem) {
                    this.data.item.items[this.data.index].listItem = [];
                }
                if (this.data.isNew) {
                    this.data.item.items[this.data.index].listItem.push({ name: request.name, icon: request.icon });
                } else {
                    this.data.item.items[this.data.index].listItem[this.data.indexEdit].name = request.name;
                    this.data.item.items[this.data.index].listItem[this.data.indexEdit].icon = request.icon;
                }
            }

            request = this.data.item;
        } else {
            if (!this.data.isNew) {
                request.id = id;
            }
        }

        this.menuService.createOrUpdateMenu(request)
            .subscribe(() => {
                this.closeDialog(true);
            }, (error) => {

            });
    }

    closeDialog(callback): void {
        this.dialogRef.close(callback);
    }

    fillModal(data): void {
        this.form.setValue(data);
    }
}
