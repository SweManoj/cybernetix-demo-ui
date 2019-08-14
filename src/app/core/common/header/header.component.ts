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
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    options = {
        minimum: 0.08,
        maximum: 1,
        ease: 'linear',
        speed: 100,
        trickleSpeed: 200,
        meteor: true,
        spinner: true,
        spinnerPosition: 'right',
        direction: 'leftToRightIncreased',
        color: 'red',
        thick: true
    };

    themeName: string;
    private prevThemeName: string;
    riskyUsers = [];

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
    searchEntity: any = '';
    allEntitiesNames: string[] = [];

    ngOnInit() {
    }

    filterRiskEntities() {

        if (this.searchEntity !== '') {
            this.utilDataService.filteredRiskyUsers = [];

            this.dashboardService.searchUserByName(this.searchEntity).subscribe((res: any) => {
                this.riskyUsers = res;

                const forFilterDuplication = this.riskyUsers.filter(riskyUser =>
                    riskyUser.u_firstName.toLowerCase().indexOf(this.searchEntity.toLowerCase()) !== -1)  // user name
                    .concat(this.riskyUsers.filter(riskyUser =>
                        riskyUser.u_departmentName.toLowerCase().indexOf(this.searchEntity.toLowerCase()) !== -1))  // department name
                    .concat(this.riskyUsers.filter(riskyUser =>
                        riskyUser.u_title.toLowerCase().indexOf(this.searchEntity.toLowerCase()) !== -1))  // role name
                    .concat(this.riskyUsers.filter(riskyUser =>
                        riskyUser.u_country.toLowerCase().indexOf(this.searchEntity.toLowerCase()) !== -1))  // location name

                if (forFilterDuplication.length > 0) {
                    this.utilDataService.filteredRiskyUsers = this.removeDuplicates(forFilterDuplication, 'u_employeeId');
                    this.router.navigate(['/filteredRiskyUsers', this.searchEntity.toString()]);
                } else {
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

    removeDuplicates(myArr: any[], prop: string) {
        return myArr.filter((obj: any, pos: number, arr: any[]) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    };

    search = (text$: Observable<string>) =>
        text$
            .pipe(debounceTime(200))
            .pipe(distinctUntilChanged())
            .pipe(map(term => term.length < 1 ? []
                : this.allEntitiesNames.filter(entity => entity.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 4)));
}
