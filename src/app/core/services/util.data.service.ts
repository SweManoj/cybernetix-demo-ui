import { Injectable } from "@angular/core";

@Injectable()
export class UtilDataService {

  filteredRiskyUsers: any[] = [];

  allRiskyUsers: any = [
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
    },
    {
      id: "9",
      user: "Sin ROpitz",
      riskScore: 98,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Uploded More Data"
    },
    {
      id: "10",
      user: "Svc-ROpitz",
      riskScore: 65,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Uploded More Data"
    },
    {
      id: "11",
      user: "Sc Opitz",
      riskScore: 45,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Uploded More Data"
    },
    {
      id: "12",
      user: "Spitz",
      riskScore: 34,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "VPN Activity By A Single User From Different States Within An Hour"
    },
    {
      id: "13",
      user: "Opitz",
      riskScore: 23,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "VPN Activity By A Single User From Different States Within An Hour"
    },
    {
      id: "14",
      user: "SvOpitz",
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
      id: "15",
      user: "ROptz",
      riskScore: 99,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Uploded More Data"
    },
    {
      id: "16",
      user: "splittz",
      riskScore: 83,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "VPN Activity By A Single User From Different States Within An Hour"
    },
    {
      id: "17",
      user: "Riots",
      riskScore: 38,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Uploded More Data"
    },
    {
      id: "18",
      user: "Aladin",
      riskScore: 40,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Downloding More Data From File Sharing Sites"
    },
    {
      id: "19",
      user: "Adan",
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
      id: "20",
      user: "Repo",
      riskScore: 95,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Uploded More Data"
    },
    {
      id: "21",
      user: "Pearson",
      riskScore: 65,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Windows Activity Done By A Terminated Account"
    },
    {
      id: "22",
      user: "Pulse",
      riskScore: 45,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Same user tried to login from 4 or more IP addresses"
    },
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
    },
    {
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
      riskScore: 100,
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
    },
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
    },
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
    },
    {
      id: "48",
      user: "Hanny",
      riskScore: 30,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "User Performing Clear Text Password Logon"
    },
    {
      id: "49",
      user: "Shardy",
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
      id: "50",
      user: "Paul",
      riskScore: 100,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "User Performing Clear Text Password Logon"
    },
    {
      id: "51",
      user: "Smith",
      riskScore: 88,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "Logon Event By Service Account As An User"
    },
    {
      id: "52",
      user: "Jhon",
      riskScore: 90,
      department: "Engineering",
      role: "VP Buisness Development",
      location: "Los Angeles",
      reportingManager: "Paul Smith",
      creationDate: "2018-05-12",
      lastWorkingDay: "2019-01-12",
      lastViolation: "User Performing Clear Text Password Logon"
    }
  ];

  getAllRiskyUsers(): any[] {
    return this.allRiskyUsers;
  }

  getFilteredRiskyUsers(): any[] {
    return this.filteredRiskyUsers;
  }

}