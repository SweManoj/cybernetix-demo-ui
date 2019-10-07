import { Component, OnInit } from '@angular/core';
import { UtilDataService } from './../../../../core/services/util.data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-policy-violated-users',
  templateUrl: './policy-violated-users.component.html',
  styleUrls: ['./policy-violated-users.component.scss']
})
export class PolicyViolatedUsersComponent implements OnInit {
  filteredRiskyEntities: any;
  selectedPolicy = "";
  filteredRiskyEntitiesForPV01 = {
    routerLink: 'riskyUser',
    pvId: 'PV 088',
    title: 'Abnormal Beaconing from Host - Proxy',
    users: [
      {
        id: "1",
        user: "Danae Farone",
        riskScore: 50,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "India",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Same user tried to login from 4 or more IP addresses"
      },
      {
        id: "2",
        user: "Danae Farone",
        riskScore: 80,
        department: "IT Security",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Interactive login attempt by user without badge activity"
      },
      {
        id: "3",
        user: "Anae Farone",
        riskScore: 59,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "4",
        user: "Dayneae Done",
        riskScore: 70,
        department: "It Security",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "5",
        user: "ADittmer",
        riskScore: 98,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "India",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "6",
        user: "Admist Fane",
        riskScore: 94,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "7",
        user: "Danae Farone",
        riskScore: 86,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "User Performing Clear Text Password Logon"
      },
      {
        id: "8",
        user: "Danae Farone",
        riskScore: 67,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      }]
  };

  filteredRiskyEntitiesForPV05 = {
    routerLink: 'riskyUser',
    title: 'Rare Host Usage',
    pvId: 'PV 089',
    users: [
      {
        id: "42",
        user: "Trigger",
        riskScore: 70,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "43",
        user: "Shadon",
        riskScore: 50,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Interactive login attempt by user without badge activity"
      },
      {
        id: "44",
        user: "Harry",
        riskScore: 30,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Logon Event By Service Account As An User"
      },
      {
        id: "45",
        user: "Fling",
        riskScore: 64,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "46",
        user: "Sling",
        riskScore: 56,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Logon Event By Service Account As An User"
      },
      {
        id: "47",
        user: "Samy",
        riskScore: 45,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      }]
  };

  filteredRiskyEntitiesForPV02 = {
    routerLink: 'riskyUser',
    pvId: 'PV 090',
    title: 'Failed Login Attempts On Same IP By Multiple Users',
    users: [
      {
        id: "35",
        user: "Swift",
        riskScore: 79,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "36",
        user: "David",
        riskScore: 50,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "37",
        user: "Jackson",
        riskScore: 97,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "38",
        user: "Ruby",
        riskScore: 45,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Logon Event By Service Account As An User"
      },
      {
        id: "39",
        user: "Rails",
        riskScore: 34,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Downloding More Data From File Sharing Sites"
      },
      {
        id: "40",
        user: "Rambo",
        riskScore: 60,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "41",
        user: "Ramp",
        riskScore: 90,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Logon Event By Service Account As An User"
      }]
  };


  filteredRiskyEntitiesForPV03 = {
    routerLink: 'riskyUser',
    pvId: 'PV 091',
    title: 'Interactive login attempt by user without badge activity',
    users: [
      {
        id: "23",
        user: "Elim",
        riskScore: 78,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Software Downloaded From Malacious Website"
      },
      {
        id: "24",
        user: "Phillip",
        riskScore: 44,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "25",
        user: "Gomes",
        riskScore: 55,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Software Downloaded From Malacious Website"
      },
      {
        id: "26",
        user: "Thomas",
        riskScore: 24,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Windows Activity Done By A Terminated Account"
      },
      {
        id: "27",
        user: "Thane",
        riskScore: 16,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Increased In Failed Network Login"
      },
      {
        id: "28",
        user: "Angel",
        riskScore: 80,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Downloding More Data From File Sharing Sites"
      }
    ]
  };

  filteredRiskyEntitiesForPV04 = {
    routerLink: 'riskyUser',
    pvId: 'PV 092',
    title: 'Abnormal Outbound Connections From Host',
    users: [{
      id: "29",
      user: "Guccifer",
      riskScore: 70,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Same IP is used for failed login attempts by 4 or more accounts"
    },
    {
      id: "30",
      user: "Lucifer",
      riskScore: 90,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Same user tried to login from 4 or more IP addresses"
    },
    {
      id: "31",
      user: "Syrian",
      riskScore: 88,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Downloding More Data From File Sharing Sites"
    },
    {
      id: "32",
      user: "Persia",
      riskScore: 10,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Multiple users logged-in successfully from same IP"
    },
    {
      id: "33",
      user: "Barglee",
      riskScore: 25,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Downloding More Data From File Sharing Sites"
    },
    {
      id: "34",
      user: "Tailor",
      riskScore: 87,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Interactive login attempt by user without badge activity"
    }
    ]
  };

  reconnaissance = {
    routerLink: 'riskyIP',
    title: '',
    pvId: '',
    users: [
      {
        id: "42",
        user: "10.82.32.212",
        riskScore: 95,
        department: "",
        role: "",
        location: "",
        reportingManager: "",
        creationDate: "2018-05-12",
        lastWorkingDay: "",
        lastViolation: "Uploded More Data"
      },
      {
        id: "43",
        user: "Shadon",
        riskScore: 50,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Interactive login attempt by user without badge activity"
      },
      {
        id: "44",
        user: "Harry",
        riskScore: 30,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Logon Event By Service Account As An User"
      },
      {
        id: "45",
        user: "Fling",
        riskScore: 64,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "46",
        user: "Sling",
        riskScore: 56,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Logon Event By Service Account As An User"
      },
      {
        id: "47",
        user: "Samy",
        riskScore: 45,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      }]
  };

  dataExfiltration = {
    routerLink: 'riskyUser',
    title: '',
    pvId: '',
    users: [
      {
        id: "42",
        user: "Adm-EMoor",
        riskScore: 95,
        department: "Sales",
        role: "AVP - Sales",
        location: "San Diego",
        reportingManager: "Ryan Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "",
        lastViolation: "Uploded More Data"
      },
      {
        id: "43",
        user: "Shadon",
        riskScore: 50,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Interactive login attempt by user without badge activity"
      },
      {
        id: "44",
        user: "Harry",
        riskScore: 30,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Logon Event By Service Account As An User"
      },
      {
        id: "45",
        user: "Fling",
        riskScore: 64,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      },
      {
        id: "46",
        user: "Sling",
        riskScore: 56,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Logon Event By Service Account As An User"
      },
      {
        id: "47",
        user: "Samy",
        riskScore: 45,
        department: "Engineering",
        role: "VP Buisness Development",
        location: "Los Angeles",
        reportingManager: "Paul Smith",
        creationDate: "2018-05-12",
        lastWorkingDay: "2019-01-12",
        lastViolation: "Uploded More Data"
      }]
  };

  nonThreatVector = true;

  routerPage(routerLink, user) {
    this.router.navigateByUrl(`/${routerLink}/${user}`)
  }

  constructor(private utilDataService: UtilDataService, private routeParam: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.routeParam.paramMap.subscribe((params) => {
      this.selectedPolicy = params.get('pvId');
      switch (this.selectedPolicy) {
        case 'PV01': this.filteredRiskyEntities = this.filteredRiskyEntitiesForPV01;
          break;
        case 'PV02': this.filteredRiskyEntities = this.filteredRiskyEntitiesForPV02;
          break;
        case 'PV03': this.filteredRiskyEntities = this.filteredRiskyEntitiesForPV03;
          break;
        case 'PV04': this.filteredRiskyEntities = this.filteredRiskyEntitiesForPV04;
          break;
        case 'PV05': this.filteredRiskyEntities = this.filteredRiskyEntitiesForPV05;
          break;
        case 'Reconnaissance':
          this.nonThreatVector = false;
          this.filteredRiskyEntities = this.reconnaissance;
          this.filteredRiskyEntities.title = this.selectedPolicy;
          break;
        case 'Data Exfiltration':
          this.nonThreatVector = false;
          this.filteredRiskyEntities = this.dataExfiltration;
          this.filteredRiskyEntities.title = this.selectedPolicy;
          break;
        default:
          this.nonThreatVector = false;
          this.filteredRiskyEntities = this.filteredRiskyEntitiesForPV05;
          this.filteredRiskyEntities.title = this.selectedPolicy;
          break;
      }
    });
  }

  getRiskScoreColor(riskScore: number) {
    if (riskScore <= 65)
      return "limegreen";
    else if (riskScore > 65 && riskScore <= 79)
      return "darkorange";
    else
      return "crimson";
  }


}
