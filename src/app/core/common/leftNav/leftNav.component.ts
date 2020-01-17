import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from '../../services/util.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { LoginService } from '../../login/login.service';

@Component({
    selector: 'app-menu',
    templateUrl: './leftNav.component.html'
})
export class LeftNavComponent {

    menuList = [];
    RBackList = [];
    
    userPermissions = [];
    userRoles = [];

    constructor(private translateService: TranslateService, private util: UtilService
        , @Inject(SESSION_STORAGE) private sessionStorage: StorageService, private loginService: LoginService) {

        this.userPermissions = JSON.parse(this.sessionStorage.get('userPermissions'));
        this.userRoles = JSON.parse(this.sessionStorage.get('userRoles'));

        this.menuList = [
            {
                ionIcon: '',
                faIcon: '',
                img: 'dashboard_active.png',
                title: 'Dashboard', // this.translateService.instant('general.menu.dashboard')
                navLink: '/dashboard',
                access: this.userPermissions && this.userPermissions.includes('Dashboard_Control')
            },
            /* {
                ionIcon: '',
                faIcon: 'fa fa-lock',
                img: '',
                title: 'Violations', // this.translateService.instant('general.menu.dashboard')
                navLink: '/policyViolation'
            }, */
            {
                ionIcon: '',
                faIcon: 'fa fa-cogs',
                img: '',
                title: 'Incidents', // this.translateService.instant('general.menu.dashboard')
                navLink: '/caseManagement',
                access: this.userPermissions && this.userPermissions.includes('Insight_Control')
            },
            {
                ionIcon: '',
                faIcon: 'fa fa-pencil-square-o',
                img: '',
                title: 'Insight Config', // this.translateService.instant('general.menu.dashboard')
                navLink: '/insightConfigurations',
                access: this.userPermissions && this.userPermissions.includes('Insightconfiguration_Control')
            },
            {
                ionIcon: '',
                faIcon: 'fa fa-globe',
                img: '',
                title: 'Pulse', // this.translateService.instant('general.menu.dashboard')
                navLink: '/cyberNetixPulse',
                access: this.userPermissions && this.userPermissions.includes('Pulse_Control')
            }
        ];

        this.RBackList = [
            {
                ionIcon: '',
                faIcon: '',
                img: 'user-roles.png',
                title: 'Roles',
                navLink: '/rback',
                access: this.userRoles && this.userRoles.includes('ROLE_ADMIN')
            },
            {
                ionIcon: '',
                faIcon: 'fa fa-users',
                img: '',
                title: 'Users',
                navLink: '/rback/userList',
                access: this.userRoles && this.userRoles.includes('ROLE_ADMIN')
            }
        ];

    }

    isMenuOpened() {
        return this.util.isMenuOpened;
    }
}
