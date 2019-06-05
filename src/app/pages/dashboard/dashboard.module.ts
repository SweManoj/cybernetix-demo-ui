import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { DashboardService } from './dashboard.service';
import { PieChartComponent } from './components/pieChart/pieChart.component';
import { TopDetailsComponent } from './components/topDetails/topDetails.component';
import { TopDetailsService } from './components/topDetails/topDetails.service';
import { RiskyUsersComponent } from './components/riskyUsers/riskyUsers.component';
import { AppRoutingModule } from '../../app.routing.module';
import { RiskyUserService } from './components/riskyUsers/riskyUser.service';
import { ContentModalComponent } from './components/riskyUsers/riskyUsers-modal/riskyUsers-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RiskyUserInfoModalComponent } from './components/riskyUsers/risky-user-info-modal/risky-user-info-modal.component';
import { MapChartComponent } from './components/map-chart/map-chart.component';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox'
import { RadioButtonModule } from 'primeng/radiobutton';
import { GlobeChartComponent } from './components/globe-chart/globe-chart-component';
import { ChartModule } from 'primeng/chart'
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { RiskScoreModalComponent } from './components/riskyUsers/risk-score-modal/risk-score-modal.component';
import { FilterRiskEntityComponent } from './components/riskyUsers/filter-risk-entity/filter-risk-entity.component';
import { RiskyEntityViewComponent } from './components/riskyUsers/filter-risk-entity/risky-entity-view/risky-entity-view';

@NgModule({
    declarations: [
        DashboardComponent,
        PieChartComponent,
        TopDetailsComponent,
        RiskyUsersComponent,
        ContentModalComponent,
        RiskyUserInfoModalComponent,
        MapChartComponent,
        GlobeChartComponent,
        RiskScoreModalComponent,
        RiskyEntityViewComponent,
        FilterRiskEntityComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        TranslateModule,
        EasyPieChartModule,
        NgbModule,
        Ng2Charts,
        TableModule,
        DropdownModule,
        CheckboxModule,
        RadioButtonModule,
        ChartModule,
        AmChartsModule
    ],
    entryComponents: [
        ContentModalComponent,
        RiskyUserInfoModalComponent,
        RiskScoreModalComponent
    ],
    providers: [
        DashboardService,
        TopDetailsService,
        RiskyUserService
    ]
})
export class DashboardModule {
}
