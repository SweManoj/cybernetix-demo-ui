import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-role-action',
  templateUrl: './role-action.component.html',
  styleUrls: ['./role-action.component.scss']
})
export class RoleActionComponent implements OnInit {

  pageTitle = 'Add Role';
  editRole = false;
  viewRole = false;

  roleId: number;
  roleForm: FormGroup;

  validationMessages = {
    'roleName': {
      'required': 'Role Name is required',
      'minlength': 'Role Name must be greater than 4 characters'
    },
    'permissions': {
      'required': 'Please Select the Permissions'
    }
  };

  formErrors = {
    'roleName': '',
    'permissions': ''
  };

  permissionList = [
    { "id": 1, "itemName": "ROLE_ADMIN" },
    { "id": 2, "itemName": "ROLE_ANALYST" },
    { "id": 3, "itemName": "ROLE_USER" },
    { "id": 4, "itemName": "ROLE_DIRECTIVE" }
  ];

  permissionSettings = {
    singleSelection: false,
    text: "Select Permissions",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
  };

  onSelectItem(event) {
    this.roleForm.get('permissions').markAsTouched()
  }

  logValidationErrors(group: FormGroup = this.roleForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';

      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  initRoleForm() {
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.minLength(4)]],
      permissions: ['', [Validators.required]]
    });

    this.roleForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.roleForm);
    });
  }

  submitRole() {
    this.allFormTouched(this.roleForm);
    this.logValidationErrors(this.roleForm);
    if (this.roleForm.invalid)
      return;
    else {
      console.log('valid data');
    }
  }

  allFormTouched(group: FormGroup) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup)
        this.allFormTouched(abstractControl);
      else
        abstractControl.markAsTouched();
    });
  }

  constructor(private location: Location, private fb: FormBuilder,
    private activeRoute: ActivatedRoute, private router: Router, private ngbModal: NgbModal) { }

  ngOnInit() {
    this.initRoleForm();

    const url = this.router.url;
    if (!url.includes('add')) {
      this.activeRoute.paramMap.subscribe((params: Params) => {
        this.roleId = params.get('roleId');
        if (url.includes('edit')) {
          this.pageTitle = 'Edit Role';
          this.editRole = true;
        } else {
          this.pageTitle = 'View Role';
          this.viewRole = true;
          this.roleForm.disable();
        }
      });
    }
  }

  previousPage() {
    this.location.back();
  }

}
