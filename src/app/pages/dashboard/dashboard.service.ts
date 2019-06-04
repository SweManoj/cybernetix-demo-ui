import { Injectable } from "@angular/core";
import { UserContext } from "../../core/services/userContext";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class DashboardService {
    private pieChart = {
        animate: {
            duration: 500,
            enabled: true
        },
        barColor: "red",
        trackColor: "#252c32",
        scaleColor: false,
        lineWidth: 7,
        lineCap: "circle"
    };

    private topInfoLight = [
        { total: "100 K", title: "Users", ico: "users@2x.png" },
        { total: "20 K", title: "IP Address", ico: "Ip@2x.png" },
        {
            total: "1125",
            title: "Previledges Users",
            ico: "previledged users@2x.png"
        },
        { total: "56,000", title: "Highest Risk Users", ico: "risky@2x.png" },
        { total: "78", title: "Hostname", ico: "hostname@2x.png" },
        { total: "17", title: "Service Account", ico: "service@2x.png" },

        { total: "12 M", title: "Raw Logs", ico: "logs@1x.png" },
        { total: "121 K", title: "Parsed Logs", ico: "noun_Check@1x.png" },
        { total: "80 M", title: "Policy Violations", ico: "violations@2x.png" },
        { total: "56,000", title: "Incidents", ico: "incident@2x.png" },
        { total: "141 K", title: "Notable Entities", ico: "entities@1x.png" },
        { total: "17", title: "Actions", ico: "actions@1x.png" }
    ];

    private topInfoDark = [
        { total: "100 K", title: "Users", ico: "users@2x.png" },
        { total: "20 K", title: "IP Address", ico: "Ip@2x.png" },
        {
            total: "1125",
            title: "Previledges Users",
            ico: "previledged users@2x.png"
        },
        { total: "56,000", title: "Highest Risk Users", ico: "risky@2x.png" },
        { total: "78", title: "Hostname", ico: "hostname@2x.png" },
        { total: "17", title: "Service Account", ico: "service@2x.png" },

        { total: "12 M", title: "Raw Logs", ico: "logs@1x.png" },
        { total: "121 K", title: "Parsed Logs", ico: "noun_Check@1x.png" },
        { total: "80 M", title: "Policy Violations", ico: "violations@2x.png" },
        { total: "56,000", title: "Incidents", ico: "incident@2x.png" },
        { total: "141 K", title: "Notable Entities", ico: "entities@1x.png" },
        { total: "17", title: "Actions", ico: "actions@1x.png" }
    ];

    private theme: string;
    basePath: string = null;
    constructor(private userContext: UserContext, private http: HttpClient) {
        this.basePath = this.userContext.getBasePath();
        this.theme = this.userContext.getTheme();
        this.updateDefaultPie();
    }

    get defaultPieChart() {
        return this.pieChart;
    }

    getTopInfo() {
        if (this.theme == "black-theme") {
            return this.topInfoDark;
        } else {
            return this.topInfoLight;
        }
    }

    getPieChartsSummary() {
        const url = `${this.basePath}/api/dashboard/getSummary`;
        return this.http.get(url);
    }

    updateDefaultPie() {
        switch (this.theme) {
            case "black-theme": {
                this.pieChart.barColor = environment.blackThemeBrandColor;
                this.pieChart.trackColor =
                    environment.blackThemePieChartTrackColor;
                break;
            }
            case "blue-theme": {
                this.pieChart.barColor = environment.blueThemeBrandColor;
                this.pieChart.trackColor =
                    environment.blueThemePieChartTrackColor;
                break;
            }
        }
    }
}
