import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';

// Services
import { MenuService } from 'src/app/services/menu.service';

// Classes


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
        if (this.data && this.data.id) {
            this.menuService.getById(this.data.id)
                .subscribe((response) => {
                    this.fillModal(response);
                });
        }
        this.dialog = this.dialogRef;
    }

    saveOrUpdate(id: number): void {
        if (!this.form.valid) {
            return;
        }

        this.menuService.createOrUpdateMenu(this.form.value)
            .subscribe((response) => {
                this.closeDialog(response);
            }, (error) => {

            });
    }

    closeDialog(callback): void {
        this.dialogRef.close(callback);
    }

    fillModal(data): void {
        data.clientId = null;
        data.clientBaseId = null;

        this.form.setValue(data);
    }
}
