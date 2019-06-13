import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// services
import { StartupConfigService } from './startup.config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MenuService {

    constructor(private http: HttpClient, private apiConfig: StartupConfigService) { }

    getAll(): Observable<any[]> {
        const url = `${this.apiConfig.getConfig()}api/menu`;
        return this.http.get<any[]>(url, {
            headers: httpOptions.headers
        });
    }

    getById(_id: string): Observable<any[]> {
        const url = `${this.apiConfig.getConfig()}api/menu/${_id}`;
        return this.http.get<any[]>(url, httpOptions);
    }

    createOrUpdateCollege(college: any): Observable<any> {
        const url = `${this.apiConfig.getConfig()}api/menu`;

        if (college._id) {
            return this.http.put(`${url}/${college._id}`, college, httpOptions);
        } else {
            return this.http.post(url, college, httpOptions);
        }
    }

    delete(_id: string): Observable<any> {
        const url = `${this.apiConfig.getConfig()}api/menu/${_id}`;
        return this.http.delete(url, httpOptions);
    }
}
