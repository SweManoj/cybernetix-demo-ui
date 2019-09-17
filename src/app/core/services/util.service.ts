import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

    menuStatus: boolean = false;


    constructor() { }

    set isMenuOpened(menuStatus) {
        this.menuStatus = menuStatus;
    }

    get isMenuOpened() {
        return this.menuStatus;
    }

}
