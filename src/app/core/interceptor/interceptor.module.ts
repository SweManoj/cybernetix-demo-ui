import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './auth.interceptor';
// import { SessionInterceptor } from './session.interceptor';
import { HttpErrorFilter } from './HttpErrorFilter';
import { HttpFilter } from './HttpFilter';
// import { AuthInterceptor } from './auth.interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorFilter,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpFilter,
            multi: true
        }
    ]
})
export class InterceptorModule { }
