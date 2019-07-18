import { EventEmitter, Injectable, Output } from '@angular/core';
import { SessionStorage } from './sessionStorage';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserContext {
    authToken: String = null;
    theme: string;
    sessionData = null;
    private themeSessionKey: string = 'selectedTheme';
    @Output() change: EventEmitter<string> = new EventEmitter();

    constructor(private sessionStorage: SessionStorage) {
        this.sessionData = this.sessionStorage.getItem(null);
        this.theme = this.sessionStorage.getItem(this.themeSessionKey) || environment.theme;
        if (this.sessionData) {
            this.authToken = this.sessionData.authToken;
        }
    }

    setAuthToken(authToken) {
        this.authToken = authToken;
    }

    getAuthToken() {
        return this.authToken;
    }

    getBasePath() {
        return '';
    }

    getServerUrl() {
        return 'http://3.130.138.106:9090/cybernetix';
    }

    get themeName() {
        return this.theme;
    }

    set themeName(theme) {
        this.theme = theme;
        this.sessionStorage.setItem(this.themeSessionKey, this.theme);
        location.reload();
    }

    getTheme() {
        return `${this.theme}-theme`;
    }
}
