import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class InsightConfigureService {

    mainURl: string;

    constructor(private http: HttpClient) {
        this.mainURl = `${environment.serverUrl}`;
    }

    getAllMitreTactics() {
        const url = `${this.mainURl}/getAllMitreTactics`;
        return this.http.get(url);
    }

    getMitreTechniquesByMitreTacticId(mitreTacticId: number) {
        const url = `${this.mainURl}/getMitreTechniquesByMitreTacticId/${mitreTacticId}`;
        return this.http.get(url);
    }

}