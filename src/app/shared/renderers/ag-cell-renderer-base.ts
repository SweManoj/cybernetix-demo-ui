import { AgCellRendererEvent, AgCellRendererEventHandler } from './ag-cell-rendere.event';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export abstract class AgCellRendererBase implements ICellRendererAngularComp {

    params: ICellRendererParams;
    contextComponent: any;

    editButton = false;
    viewButton = false;
    deleteButton = false;
    copyButton = false;
    changePasswordButton = false;
    actionColor = '#099bb5';

    agInit(params: any): void {
        this.params = params;

        const context = params.context;
        this.editButton = context.editButton;
        this.viewButton = context.viewButton;
        this.deleteButton = context.deleteButton;
        this.copyButton = context.copyButton;
        this.changePasswordButton = context.changePasswordButton;

        if (!params.context || !params.context.componentParent) {
            const errMsg = `Hosting component must implement AgCellRendererEventHandler.
                And attribute [contex]="context" along with others in template is must -> <ag-grid-angular ... [context]="context">.`;
            throw new Error(errMsg);
        } else {
            this.contextComponent = params.context.componentParent;
        }
    }

    sendEvent(type: string, event?: MouseEvent) {
        const rendererEvent: AgCellRendererEvent = { type, params: this.params };
        this.contextComponent.handleAgRendererEvent(rendererEvent);

        if (event) {
            event.preventDefault();
        }
    }

    refresh(): boolean {
        return false;
    }

}
