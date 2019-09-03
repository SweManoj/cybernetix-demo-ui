import { Component, Inject } from '@angular/core';
import { UserContext } from '../../services/userContext';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { UtilService } from '../../services/util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { UtilDataService } from '../../services/util.data.service';
import { ModalUtilComponent } from '../modal-util/modal.util.component';
import { DashboardService } from '../../../pages/dashboard/dashboard.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    options = {
        ease: 'linear',
        meteor: true,
        spinner: false,
        spinnerPosition: 'right',
        direction: 'leftToRightIncreased',
        color: '#42b4e6',
        thick: true
    };
    opened: boolean;
    themeName: string;
    private prevThemeName: string;
    riskyUsers = [];
    riskyIPAddress = [];
    riskyHosts = [];

    constructor(private userContext: UserContext, private router: Router,
        idle: Idle, @Inject(SESSION_STORAGE) private sessionStorage: StorageService,
        private loginService: LoginService, private utilService: UtilService, public modal: NgbModal,
        private utilDataService: UtilDataService, private ngbModal: NgbModal, private dashboardService: DashboardService) {

        this.themeName = this.userContext.themeName;
        this.prevThemeName = this.themeName;

        idle.setIdle(600);
        idle.setTimeout(1);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onTimeout.subscribe(() => {
            this.loginService.logout();
            this.sessionStorage.set('redirectURL', this.router.url);
        });

        idle.watch();
    }

    toggleMenu() {
        this.utilService.isMenuOpened = !this.utilService.isMenuOpened;
    }

    signout() {
        this.loginService.logout();
        this.router.navigate(['/login']);
    }

    showSettings(settingsModal) {
        this.modal.open(settingsModal, {
            centered: true,
            size: 'lg'
        }).result.then(() => {
        }, () => {
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
    searchEntity: any = '';
    allEntitiesNames: string[] = [];

    ngOnInit() {
    }

    filterRiskEntities() {

        if (this.searchEntity !== '') {
            this.utilDataService.filteredRiskyUsers = [];

            this.dashboardService.searchUserByName(this.searchEntity).subscribe((res: any) => {
                this.riskyUsers = res.users;
                this.riskyHosts = res.hosts;
                this.riskyIPAddress = res.ipAddresses;

                if (this.riskyUsers.length > 0 || this.riskyHosts.length > 0 || this.riskyIPAddress.length > 0) {
                    this.utilDataService.filteredRiskyUsers = this.riskyUsers;
                    this.utilDataService.filteredRiskyHost = this.riskyHosts;
                    this.utilDataService.filteredRiskyIPAddress = this.riskyIPAddress;
                    this.router.navigate(['/filteredRiskyUsers', this.searchEntity.toString()]);
                }



                if (res.users.length === 0 && res.hosts.length === 0 && res.ipAddresses.length === 0) {
                    const modalRef = this.ngbModal.open(ModalUtilComponent, { size: 'sm', backdrop: 'static' }); // { size: 'sm' }
                    modalRef.componentInstance.modalHeader = 'Warning';
                    modalRef.componentInstance.modalMessage = 'No Records Found !';
                    modalRef.componentInstance.cancelFlag = false;

                }

            });
        } else {
            const modalRef = this.ngbModal.open(ModalUtilComponent, { size: 'sm', backdrop: 'static' }); // { size: 'sm' }
            modalRef.componentInstance.modalHeader = 'Warning';
            modalRef.componentInstance.modalMessage = 'Please Enter Risky Entity Values !';
            modalRef.componentInstance.cancelFlag = false;
        }
    }

    changeMenuOpen() {
        this.utilService.isMenuOpened = !this.utilService.isMenuOpened;
    }

    search = (text$: Observable<string>) =>
        text$
            .pipe(debounceTime(200))
            .pipe(distinctUntilChanged())
            .pipe(map(term => term.length < 1 ? []
                : this.allEntitiesNames.filter(entity => entity.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 4)));
}
