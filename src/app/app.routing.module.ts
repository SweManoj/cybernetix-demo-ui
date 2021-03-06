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
import { TestEsComponent } from './pages/case-management/components/test-es/test-es.component';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

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
                path: 'caseManagement',
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
                path: 'cyberNetizPulse',
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
        RouterModule, NgxChartsModule,TextareaAutosizeModule
    ]
})
export class AppRoutingModule {
}
