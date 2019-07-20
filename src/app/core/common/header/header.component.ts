import { Component } from '@angular/core';
import { SessionStorage } from '../../services/sessionStorage';
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

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    themeName: string;
    private prevThemeName: string;
    riskyUsers = [];

    constructor(private sessionStorage: SessionStorage, private userContext: UserContext, private router: Router,
        private loginService: LoginService, private utilService: UtilService, public modal: NgbModal,
        private utilDataService: UtilDataService, private ngbModal: NgbModal,private dashboardService: DashboardService) {
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
    searchEntity: any='';
    allEntitiesNames: string[] = [];

    ngOnInit() {
        var uniqueEntityNames = new Set<String>();

        /*  filtering risky users name
        riskyUsers.forEach(riskyUser => {
            uniqueEntityNames.add(riskyUser.user);
        });

        // removing duplicacy of risky users name
        Array.from(uniqueEntityNames).forEach(uniqueEntityName => {
            this.allEntitiesNames.push(uniqueEntityName.toString());
        }); */
    }

    /*  search risky users
    searchingEntity() {
        console.log('event user is : ' + this.searchEntity);
        const filteredRiskyUsers: any[] = riskyUsers.filter(riskyUser => String(riskyUser.user).toLowerCase().includes(this.searchEntity.toLowerCase()));

        if (filteredRiskyUsers.length > 0) {
            console.log('users are available');
            this.router.navigate(['/filteredRiskyUsers', this.searchEntity.toString()]);
        }
    } */

    filterRiskEntities() {

        if (this.searchEntity !== '') {
            this.utilDataService.filteredRiskyUsers = [];

        this.dashboardService.searchUserByName(this.searchEntity).subscribe((res: any){
                this.riskyUsers = res;

            const forFilterDuplication = this.riskyUsers.filter(riskyUser =>
                riskyUser.user.u_firstName.toLowerCase().indexOf(this.searchEntity.toLowerCase()) !== -1)  // user name
                .concat(this.riskyUsers.filter(riskyUser =>
                    riskyUser.user.u_departmentName.toLowerCase().indexOf(this.searchEntity.toLowerCase()) !== -1))  // department name
                .concat(this.riskyUsers.filter(riskyUser =>
                    riskyUser.user.u_title.toLowerCase().indexOf(this.searchEntity.toLowerCase()) !== -1))  // role name
                .concat(this.riskyUsers.filter(riskyUser =>
                    riskyUser.user.u_country.toLowerCase().indexOf(this.searchEntity.toLowerCase()) !== -1))  // location name
                /*.concat(this.riskyUsers.filter(riskyUser =>
                    riskyUser.lastViolation.toLowerCase().indexOf(this.searchEntity.toLowerCase()) !== -1));  // last violation name*/

                    if (forFilterDuplication.length > 0) {
                        this.utilDataService.filteredRiskyUsers = this.removeDuplicates(forFilterDuplication, 'id');
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
