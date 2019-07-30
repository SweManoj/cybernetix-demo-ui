import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './auth.interceptor';
import { SessionInterceptor } from './session.interceptor';
// import { AuthInterceptor } from './auth.interceptor';

@NgModule({
    providers: [
        /* {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true 
        },  */
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SessionInterceptor,
            multi: true
        }
    ]
})
export class InterceptorModule {}
