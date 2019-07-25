import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './core/login/login';
import { LoginLayoutComponent } from './core/layout/login.layout.component';
import { MenuLayoutComponent } from './core/layout/menu.layout.component';
import { AuthGuard } from './core/services/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RiskyUsersComponent } from './pages/dashboard/components/riskyUsers/riskyUsers.component';
import { CaseManagementComponent } from './pages/case-management/case-management.component';
import { AlertsComponent } from './pages/case-management/components/alerts/alerts.component';
import { PulseGlobeComponent } from './pages/case-management/components/pulse-globe/pulse-globe.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PolicyViolationDetailViewComponent } from './pages/case-management/components/policy-violation-detail-view/policy-violation-detail-view.component';
import { PolicyViolationSummaryComponent } from './pages/case-management/components/policy-violation-summary/policy-violation-summary.component';
import { IncidentSummaryComponent } from './pages/case-management/components/incident-summary/incident-summary.component';
import { TestEsComponent } from './pages/case-management/components/test-es/test-es.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FilterRiskEntityComponent } from './pages/dashboard/components/riskyUsers/filter-risk-entity/filter-risk-entity.component';
import {RiskyIPComponent} from './pages/dashboard/components/risky-ip/risky-ip.component';
import {RiskyHostComponent} from './pages/dashboard/components/riskyHost/riskyHost.component';

export const routes: Routes = [
    {
        path: '',
        component: MenuLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'allRiskyUsers',
                component: RiskyUsersComponent
            },
            {
                path: 'riskyUser/:selectedUser',
                component: RiskyUsersComponent
            },
            {
                path: 'riskyIP/:selectedIP',
                component: RiskyIPComponent
            },
            {
                path: 'riskyHost/:selectedHost',
                component: RiskyHostComponent
            },
            {
                path: 'filteredRiskyUsers/:riskyUser',
                component: FilterRiskEntityComponent
            },
            {
                path: 'caseManagement',
                component: CaseManagementComponent
            },
            {
                path: 'policyViolation',
                component: CaseManagementComponent
            },
            {
                path: 'policyViolationDetailView',
                component: PolicyViolationDetailViewComponent
            },
            {
                path: 'alerts',
                component: AlertsComponent
            },
            {
                path: 'policyViolationSummary',
                component: PolicyViolationSummaryComponent
            },
            {
                path: 'incidentSummary',
                component: IncidentSummaryComponent
            },
            {
                path: 'cyberNetixPulse',
                component: PulseGlobeComponent
            },
            {
                path: 'testES',
                component: TestEsComponent
            }
        ]
    },
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            onSameUrlNavigation: 'reload',
            useHash: true
        })
    ],
    exports: [
        RouterModule, NgxChartsModule, AutoCompleteModule
    ]
})
export class AppRoutingModule {
}
