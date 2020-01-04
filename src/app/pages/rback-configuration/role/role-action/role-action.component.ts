import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RoleService } from '../role-service';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-role-action',
  templateUrl: './role-action.component.html',
  styleUrls: ['./role-action.component.scss']
})
export class RoleActionComponent implements OnInit {

  API_KEY: any;
  API_CIPHER: any;

  pageTitle = 'Add Role';
  editRole = false;
  viewRole = false;

  roleForm: FormGroup;
  existRoleNames = [];
  submitDisabled = false;

  permissionList = [];
  permissionSettings = {
    text: "Select Permissions",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    disabled: false,
    primaryKey: "id", // default - id
    labelKey: "permissionName",  // default - itemName
  };

  constructor(private location: Location, private fb: FormBuilder,
    private activeRoute: ActivatedRoute, private router: Router, private roleService: RoleService) {

    this.API_KEY = environment.API_KEY;
    this.API_CIPHER = environment.API_CIPHER;
  }

  ngOnInit() {
    this.initRoleForm();
    const url = this.router.url;

    // not getting all permissions at view time
    if (!url.includes('view')) {
      this.roleService.getAllPermissions().subscribe((res: any) => {
        res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
        this.permissionList = res;
      });
    }

    if (!url.includes('add')) {
      this.activeRoute.paramMap.subscribe((params: Params) => {
        const roleId = params.get('roleId');

        this.roleService.getRoleMasterById(roleId).subscribe((res: any) => {
          res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));

          this.roleForm.setValue({
            roleId: res.roleId,
            roleName: res.roleName,
            displayRoleName: res.displayRoleName,
            permissions: res.permissions,
            permissionIds: []
          });
        });

        if (url.includes('edit')) {
          this.pageTitle = 'Edit Role';
          this.editRole = true;
        } else {
          this.pageTitle = 'View Role';
          this.viewRole = true;
          this.roleForm.disable();
          this.permissionSettings.disabled = true;
        }
      });
    }

    // preventing duplicate role names -- after set value (for getting roleName)
    if (!url.includes('view')) {
      this.roleService.getAllRoleMasterNames().subscribe((res: any) => {
        res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
        this.existRoleNames = res;
        if (!url.includes('add')) {
          const existRoleNameIndex = this.existRoleNames.indexOf(this.roleForm.get('roleName').value, 0);
          this.existRoleNames.splice(existRoleNameIndex, 1);
        }

        this.roleForm.get('roleName').valueChanges.subscribe(value => {
          this.existRoleNames.forEach(existRoleName => {
            if (new String(existRoleName).toLowerCase() == new String(value).toLowerCase())
              this.roleForm.get('roleName').setErrors({ duplicateRoleName: true });
          });
        });
      });
    }
  }

  validationMessages = {
    roleName: {
      required: 'Role Name is required',
      minlength: 'Role Name must be greater than 4 characters',
      duplicateRoleName: 'Role Name already Exist'
    },
    displayRoleName: {
      required: 'Role Display Name is required',
      minlength: 'Role Display Name must be greater than 4 characters'
    },
    permissions: {
      required: 'Please Select the Permissions'
    }
  };

  formErrors = {
    roleName: '',
    displayRoleName: '',
    permissions: ''
  };

  permissionClick() {
    setTimeout(() => {
      this.roleForm.get('permissions').markAsTouched();
      this.logValidationErrors();
    }, 500);
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
      roleId: [],
      roleName: ['', [Validators.required, Validators.minLength(4)]],
      displayRoleName: ['', [Validators.required, Validators.minLength(4)]],
      permissions: ['', [Validators.required]],
      permissionIds: []
    });

    this.roleForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.roleForm);
    });
  }

  submitRole() {
    this.submitDisabled = true;
    this.allFormTouched(this.roleForm);
    this.logValidationErrors(this.roleForm);
    if (this.roleForm.invalid)
      return;
    else {
      var permissionValues = this.roleForm.get('permissions').value;
      var permissionIds: Array<number[]> = [];
      permissionValues.forEach(permissionValue => {
        permissionIds.push(permissionValue.id);
      });
      this.roleForm.get('permissionIds').setValue(permissionIds);

      if (this.editRole) {
        this.roleService.updateRoleMaster(this.roleForm.value).subscribe((res) => {
          this.previousPage();
        });
      } else {
        this.roleService.addRoleMaster(this.roleForm.value).subscribe((res) => {
          this.previousPage();
        });
      }
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

  previousPage() {
    this.location.back();
  }

}
