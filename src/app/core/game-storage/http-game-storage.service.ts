import {BackendService} from '../backend.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpGameStorageService {
    constructor(private backend: BackendService) {}
}
