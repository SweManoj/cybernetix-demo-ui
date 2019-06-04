import { Component } from '@angular/core';
import { SessionStorage } from '../../services/sessionStorage';
import { UserContext } from '../../services/userContext';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { UtilService } from '../../services/util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    themeName: string;
    private prevThemeName: string;
    constructor(private sessionStorage: SessionStorage, private userContext: UserContext, private router: Router,
                private loginService: LoginService, private utilService: UtilService, public modal: NgbModal) {
        this.themeName = this.userContext.themeName;
        this.prevThemeName = this.themeName;
    }

    toggleMenu() {
        this.utilService.isMenuOpened = !this.utilService.isMenuOpened;
    }

    signout() {
        this.sessionStorage.removeItem(null);
        this.userContext.setAuthToken(null);
        this.loginService.loggedIn.next(false);
        this.router.navigate(['/login']);
    }

    showSettings(settingsModal) {
        this.modal.open(settingsModal, {
            centered: true,
            size: 'lg'
        }).result.then(() => {}, () => {
            this.updateTheme();
        });
    }

    closeModal() {
        this.updateTheme();
        this.modal.dismissAll();
    }
    
    updateTheme() {
        if (this.prevThemeName !== this.themeName) {
            this.userContext.themeName = this.themeName;
            this.prevThemeName = this.themeName;
        }
    }
}
