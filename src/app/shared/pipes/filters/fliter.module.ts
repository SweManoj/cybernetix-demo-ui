import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ShortNumberPipe } from './filter.pipe'


@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ShortNumberPipe],
    exports: [ShortNumberPipe]
})
export class FilterPipeModule {}