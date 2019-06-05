import { Component } from '@angular/core';
import { SessionStorage } from '../../services/sessionStorage';
import { UserContext } from '../../services/userContext';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { UtilService } from '../../services/util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { riskyUsers } from '../../services/util.data';

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
        }).result.then(() => { }, () => {
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

    // searchEntityAvailable
    searchEntity: any;
    allEntitiesNames: string[] = [];

    ngOnInit() {
        riskyUsers.forEach(riskyUser => this.allEntitiesNames.push(riskyUser.user));
    }

    searchingEntity() {
        console.log('event user is : ' + this.searchEntity);
        const filteredRiskyUsers: any[] = riskyUsers.filter(riskyUser => String(riskyUser.user).toLowerCase().includes(this.searchEntity.toLowerCase()));

        if (filteredRiskyUsers.length > 0) {
            console.log('users are available');
            this.router.navigate(['/filteredRiskyUsers', this.searchEntity.toString()]);
        }
    }

    search = (text$: Observable<string>) =>
        text$
            .pipe(debounceTime(200))
            .pipe(distinctUntilChanged())
            .pipe(map(term => term.length < 1 ? []
                : this.allEntitiesNames.filter(entity => entity.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 4)));
}
