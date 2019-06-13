import { Injectable } from '@angular/core';

@Injectable()
export class StartupConfigService {
    value: any;

    getConfig(): string {
        const host = window.location.host;

        if (this.value) {
            return this.value;
        }

        this.value = 'http://localhost:7001/';
        return this.value;
    }
}
