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

  optionsSelect: Array<any> = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  insightConfForm: FormGroup;
  insightName: AbstractControl;
  insightDescription: AbstractControl;
  author: AbstractControl;

  initInsightConfForm() {
    this.insightConfForm = this.formBuilder.group({
      insightName: ['', Validators.compose([Validators.required])],
      insightDescription: ['', Validators.compose([Validators.required])],
      author: ['']
    });

    this.insightName = this.insightConfForm.controls['insightName'];
    this.insightDescription = this.insightConfForm.controls['insightDescription'];
    this.author = this.insightConfForm.controls['author'];
  }

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
