import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from '../../services/util.service';

@Component({
    selector: 'app-menu',
    templateUrl: './leftNav.component.html'
})
export class LeftNavComponent {
    menuList = [];
    constructor(private translateService: TranslateService, private util: UtilService) {
        this.menuList = [
            {
                ionIcon: '',
                faIcon: '',
                img: 'dashboard_active.png',
                title: 'Dashboard', // this.translateService.instant('general.menu.dashboard')
                navLink: '/dashboard'
            },
            {
                ionIcon: '',
                faIcon: 'fa fa-lock',
                img: '',
                title: 'Violations', // this.translateService.instant('general.menu.dashboard')
                navLink: '/policyViolation'
            },
            {
                ionIcon: '',
                faIcon: 'fa fa-cogs',
                img: '',
                title: 'Incidents', // this.translateService.instant('general.menu.dashboard')
                navLink: '/caseManagement'
            },
            {
                ionIcon: '',
                faIcon: 'fa fa-pencil-square-o',
                img: '',
                title: 'Insight Config', // this.translateService.instant('general.menu.dashboard')
                navLink: '/insightConfiguration'
            },
            {
                ionIcon: '',
                faIcon: 'fa fa-globe',
                img: '',
                title: 'Pulse', // this.translateService.instant('general.menu.dashboard')
                navLink: '/cyberNetixPulse'
            }
        ];
    }


    isMenuOpened() {
        return this.util.isMenuOpened;
    }
}
