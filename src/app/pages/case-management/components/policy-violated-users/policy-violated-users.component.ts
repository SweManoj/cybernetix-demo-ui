import { Component, OnInit } from '@angular/core';
import { UtilDataService } from './../../../../core/services/util.data.service';

@Component({
  selector: 'app-policy-violated-users',
  templateUrl: './policy-violated-users.component.html',
  styleUrls: ['./policy-violated-users.component.scss']
})
export class PolicyViolatedUsersComponent implements OnInit {

  filteredRiskyEntities =  [
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
      riskScore: 100,
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
    }];;

  constructor(private utilDataService: UtilDataService) { }

  ngOnInit() {

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
