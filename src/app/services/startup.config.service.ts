import { Injectable } from '@angular/core';

@Injectable()
export class StartupConfigService {
    value: any;

    getConfig(): string {
        const host = window.location.host;

        if (this.value) {
            return this.value;
        }

        this.value = 'https://apitestunipcore.herokuapp.com/';
        return this.value;
    }
}
