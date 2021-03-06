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

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginLayoutComponent,
        MenuLayoutComponent,
        LeftNavComponent
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
        CaseManagementModule
    ],
    providers: [
        AuthGuard,
        UserContext,
        SessionStorage,
        UtilService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
