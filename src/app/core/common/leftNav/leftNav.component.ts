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
            /* {
                ionIcon: '',
                faIcon: '',
                img: 'dashboard.png',
                title: 'Dashboard', // this.translateService.instant('general.menu.dashboard')
                navLink: '/dashboard'
            }, */
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
            }
        ];
    }
    isMenuOpened() {
        return this.util.isMenuOpened;
    }
}
