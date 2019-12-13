import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsightConfigurationComponent } from './insight-configuration.component';
import { ActionInsightConfigurationComponent } from './action-insight-configuration/action-insight-configuration.component';
import { InsightConfigurationListComponent } from './insight-configuration-list/insight-configuration-list.component';

const routes: Routes = [
    {
        path: '',
        component: InsightConfigurationComponent,
        children: [
            { path: '', component: InsightConfigurationListComponent },
            { path: 'addInsightConfiguration', component: ActionInsightConfigurationComponent },
            { path: 'editInsightConfiguration/:insightConfId', component: ActionInsightConfigurationComponent },
            { path: 'viewInsightConfiguration/:insightConfId', component: ActionInsightConfigurationComponent },
            { path: '**', redirectTo: 'addInsightConfiguration', pathMatch: 'full' }
        ]
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InsightConfigurationRoutingModule { }
