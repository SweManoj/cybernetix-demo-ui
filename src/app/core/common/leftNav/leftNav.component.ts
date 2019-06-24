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
                faIcon: 'fa fa-cogs',
                img: '',
                title: 'Case', // this.translateService.instant('general.menu.dashboard')
                navLink: '/caseManagement'
            },
            {
                ionIcon: '',
                faIcon: 'fa fa-globe',
                img: '',
                title: 'CN Pulse', // this.translateService.instant('general.menu.dashboard')
                navLink: '/cyberNetizPulse'
            },
            {
                ionIcon: '',
                faIcon: '',
                img: 'calendar.png',
                title: 'Summary', // this.translateService.instant('general.menu.dashboard')
                navLink: '/policyViolationSummary'
            },
            {
                ionIcon: '',
                faIcon: '',
                img: 'calendar.png',
                title: 'Incident Summary', // this.translateService.instant('general.menu.dashboard')
                navLink: '/policyIncidentSummary'
            },
        ];
    }

    changeMenuOpen() {
        this.util.isMenuOpened = !this.util.isMenuOpened;
    }

    isMenuOpened() {
        return this.util.isMenuOpened;
    }
}
