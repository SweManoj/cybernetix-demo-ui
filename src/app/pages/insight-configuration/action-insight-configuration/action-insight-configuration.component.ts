import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-action-insight-configuration',
  templateUrl: './action-insight-configuration.component.html',
  styleUrls: ['./action-insight-configuration.component.scss']
})
export class ActionInsightConfigurationComponent implements OnInit {

  addInsightConfig = false;
  editInsightConfig = false;
  viewInsightConfig = false;
  insightConfigId: number;
  pageTitle = 'Add Insight Configuration';
  addPage = true;
  updatePage = false;
  viewPage = false;


  insightConfForm: FormGroup;
  insightName: AbstractControl;
  insightDescription: AbstractControl;
  author: AbstractControl;
  lastModifiedBy: AbstractControl;
  lastModifiedOn: AbstractControl;
  severity: AbstractControl;
  threatCategory: AbstractControl;
  threatSubCategory: AbstractControl;
  mitreTactic: AbstractControl;
  mitreTechnique: AbstractControl;
  nistControl: AbstractControl;
  insightDefinition: AbstractControl;
  insightLogic: AbstractControl;
  expressions: AbstractControl;
  outputMechanism: AbstractControl;
  emailTo: AbstractControl;
  syslogReceiver: AbstractControl;

  initInsightConfForm() {
    this.insightConfForm = this.formBuilder.group({
      insightName: ['', Validators.compose([Validators.required])],
      insightDescription: ['', Validators.compose([Validators.required])],
      author: [{ value: '', disabled: true }],
      lastModifiedBy: [{ value: '', disabled: true }],
      lastModifiedOn: [{ value: '', disabled: true }],
      severity: [''],
      threatCategory: [''],
      threatSubCategory: [''],
      mitreTactic: [''],
      mitreTechnique: [''],
      nistControl: [''],
      insightDefinition: [{ value: 'expertInsight', disabled: true }],
      insightLogic: [''],
      expressions: [''],
      outputMechanism: ['emailOutput'],
      emailTo: [''],
      syslogReceiver: ['']
    });

    this.insightName = this.insightConfForm.controls['insightName'];
    this.insightDescription = this.insightConfForm.controls['insightDescription'];
    this.author = this.insightConfForm.controls['author'];
    this.lastModifiedBy = this.insightConfForm.controls['lastModifiedBy'];
    this.lastModifiedOn = this.insightConfForm.controls['lastModifiedOn'];
    this.severity = this.insightConfForm.controls['severity'];
    this.threatCategory = this.insightConfForm.controls['threatCategory'];
    this.threatSubCategory = this.insightConfForm.controls['threatSubCategory'];
    this.mitreTactic = this.insightConfForm.controls['mitreTactic'];
    this.mitreTechnique = this.insightConfForm.controls['mitreTechnique'];
    this.nistControl = this.insightConfForm.controls['nistControl'];
    this.insightDefinition = this.insightConfForm.controls['insightDefinition'];
    this.insightLogic = this.insightConfForm.controls['insightLogic'];
    this.expressions = this.insightConfForm.controls['expressions'];
    this.outputMechanism = this.insightConfForm.controls['outputMechanism'];
    this.emailTo = this.insightConfForm.controls['emailTo'];
    this.syslogReceiver = this.insightConfForm.controls['syslogReceiver'];
  }

  severityItemList = [
    { "id": 1, "itemName": "Low" },
    { "id": 2, "itemName": "Medium" },
    { "id": 3, "itemName": "High" }
  ];

  expressionsItemList = [
    { "id": 1, "itemName": "India" },
    { "id": 2, "itemName": "Singapore" },
    { "id": 3, "itemName": "Australia" },
    { "id": 4, "itemName": "Canada" },
    { "id": 5, "itemName": "South Korea" },
    { "id": 6, "itemName": "Brazil" },
    { "id": 11, "itemName": "India" },
    { "id": 21, "itemName": "Singapore" },
    { "id": 31, "itemName": "Australia" },
    { "id": 41, "itemName": "Canada" },
    { "id": 51, "itemName": "South Korea" },
    { "id": 61, "itemName": "Brazil" },
    { "id": 12, "itemName": "India" },
    { "id": 22, "itemName": "Singapore" },
    { "id": 32, "itemName": "Australia" },
    { "id": 42, "itemName": "Canada" },
    { "id": 52, "itemName": "South Korea" },
    { "id": 62, "itemName": "Brazil" }
  ]

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private location: Location, private formBuilder: FormBuilder) {
    this.initInsightConfForm();
  }

  ngOnInit() {
    const url = this.router.url;
    if (!url.includes('add')) {
      this.addPage = false;
      this.activeRoute.paramMap.subscribe((params: Params) => {
        this.insightConfigId = params.get('insightConfId');
        if (url.includes('edit')) {
          this.pageTitle = 'Edit Insight Configuration';
          this.updatePage = true;
        } else {
          this.pageTitle = 'View Insight Configuration';
          this.viewPage = true;
        }
      });
    }
  }

  addInsightConfiguration() {
  }

  testInsightConfig() {
  }

  previousPage() {
    this.location.back();
  }

}
