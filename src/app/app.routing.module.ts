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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FilterRiskEntityComponent } from './pages/dashboard/components/riskyUsers/filter-risk-entity/filter-risk-entity.component';
import { RiskyIPComponent } from './pages/dashboard/components/risky-ip/risky-ip.component';
import { RiskyHostComponent } from './pages/dashboard/components/riskyHost/riskyHost.component';
import { InsightConfigurationListComponent } from './pages/insight-configuration/insight-configuration-list/insight-configuration-list.component';
import { ActionInsightConfigurationComponent } from './pages/insight-configuration/action-insight-configuration/action-insight-configuration.component';
import { RoleListComponent } from './pages/rback-configuration/role/role-list/role-list.component';
import { RoleActionComponent } from './pages/rback-configuration/role/role-action/role-action.component';
import { UserListComponent } from './pages/rback-configuration/user/user-list/user-list.component';
import { UserActionComponent } from './pages/rback-configuration/user/user-action/user-action.component';

export const routes: Routes = [
    {
        path: 'insightConfigurations',
        component: MenuLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: InsightConfigurationListComponent },
            { path: 'addInsightConfiguration', component: ActionInsightConfigurationComponent },
            { path: 'editInsightConfiguration/:insightConfId', component: ActionInsightConfigurationComponent },
            { path: 'viewInsightConfiguration/:insightConfId', component: ActionInsightConfigurationComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    {
        path: 'rback',
        component: MenuLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'roleList', pathMatch: 'full' },
            { path: 'roleList', component: RoleListComponent },
            { path: 'addRole', component: RoleActionComponent },
            { path: 'editRole/:roleId', component: RoleActionComponent },
            { path: 'viewRole/:roleId', component: RoleActionComponent },

            { path: 'userList', component: UserListComponent },
            { path: 'addUser', component: UserActionComponent },
            { path: 'editUser/:userId', component: UserActionComponent },
            { path: 'viewUser/:userId', component: UserActionComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
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
                path: 'policyViolation',
                component: CaseManagementComponent
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
                path: 'policyViolationSummary/:violationId/:eventDateTime/:dataAggregated',
                component: PolicyViolationSummaryComponent
            },
            {
                path: 'incidentSummary/:policyViolationId',
                component: IncidentSummaryComponent
            },
            {
                path: 'cyberNetixPulse',
                component: PulseGlobeComponent
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
        redirectTo: 'dashboard'
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
