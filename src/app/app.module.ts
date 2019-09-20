import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/common/header/header.component';
import { UserContext } from './core/services/userContext';
import { SessionStorage } from './core/services/sessionStorage';
import { InterceptorModule } from './core/interceptor/interceptor.module';
import { AppRoutingModule } from './app.routing.module';
import { LoginModule } from './core/login/login.module';
import { LoginLayoutComponent } from './core/layout/login.layout.component';
import { MenuLayoutComponent } from './core/layout/menu.layout.component';
import { AppTranslationModule } from './app.translation.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/services/auth.guard';
import { LeftNavComponent } from './core/common/leftNav/leftNav.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilService } from './core/services/util.service';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CaseManagementModule } from './pages/case-management/case-management.module';
import { UtilDataService } from './core/services/util.data.service';
import { ModalUtilComponent } from './core/common/modal-util/modal.util.component';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedPipesModule } from './shared/pipes/shared-pipes.module';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NgIdleModule } from '@ng-idle/core';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {SecreteKeyPupupComponent} from './core/login/secrete-key-popup/secrete-key-popup.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginLayoutComponent,
        MenuLayoutComponent,
        LeftNavComponent,
        SecreteKeyPupupComponent,
        ModalUtilComponent
    ],
    imports: [
        BrowserModule,
        TranslateModule,
        HttpClientModule,
        InterceptorModule,
        FormsModule,
        AppRoutingModule,
        AppTranslationModule,
        LoginModule,
        DashboardModule,
        NgbModule,
        CaseManagementModule,
        BrowserAnimationsModule,
        MaterialModule,
        HighchartsChartModule,
        SharedPipesModule,
        StorageServiceModule,
        NgIdleModule.forRoot(),
        NgProgressModule.forRoot(),
        NgProgressHttpClientModule,
        MatTooltipModule,
        MatBadgeModule,
        MatIconModule,
        NgScrollbarModule
    ],
    exports: [
        MaterialModule
    ],
    providers: [
        AuthGuard,
        UserContext,
        SessionStorage,
        UtilService,
        UtilDataService
    ],
    bootstrap: [AppComponent],
    entryComponents: [ModalUtilComponent,SecreteKeyPupupComponent]
})
export class AppModule {
}
