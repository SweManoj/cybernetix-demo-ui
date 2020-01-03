import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit {

  pageTitle = 'Add User';
  editUser = false;
  viewUser = false;

  userId: number;
  userForm: FormGroup;

  validationMessages = {
    userName: {
      required: 'User Name is required',
      minlength: 'User Name must be greater than 4 characters'
    },
    firstName: {
      required: 'First Name is required',
      minlength: 'First Name must be greater than 4 characters'
    },
    lastName: {
      required: 'Last Name is required',
    },
    email: {
      required: 'Email is required',
    },
    phoneNumber: {
      required: 'Phone Number is required',
    },
    password: {
      required: 'Password is required',
    },
    confirmPassword: {
      required: 'Confirm Password is required',
    },
    passwordGroup: {
      passwordMismatch: 'Password and Confirm Password do not Match'
    },
    roles: {
      required: 'Roles required'
    }
  };

  formErrors = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    passwordGroup: '',
    roles: ''
  };

  roleList = [
    { "id": 1, "itemName": "ROLE_ADMIN" },
    { "id": 2, "itemName": "ROLE_ANALYST" },
    { "id": 3, "itemName": "ROLE_USER" },
    { "id": 4, "itemName": "ROLE_DIRECTIVE" }
  ];

  roleSetting = {
    text: "Select Roles",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    disabled: false
  };

  constructor(private location: Location, private fb: FormBuilder,
    private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.initUserForm();

    const url = this.router.url;
    if (!url.includes('add')) {
      this.activeRoute.paramMap.subscribe((params: Params) => {
        this.userId = params.get('userId');
        if (url.includes('edit')) {
          this.pageTitle = 'Edit User';
          this.editUser = true;
        } else {
          this.pageTitle = 'View User';
          this.viewUser = true;
          this.userForm.disable();
          this.roleSetting.disabled = true;
        }
      });
    }
  }

  submitUser() {
    this.allFormTouched(this.userForm);
    this.logValidationErrors();

    if (this.userForm.invalid)
      return;
    else {
      console.log('Form Valid...');
    }
  }

  initUserForm() {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      userStatus: ['deactivate'],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: matchPasswords }),
      roles: ['', [Validators.required]]
    });

    this.userForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.userForm);
    });
  }

  previousPage() {
    this.location.back();
  }

  // manually invoke the error of role select box, if not select anythings
  roleClick() {
    setTimeout(() => {
      this.userForm.get('roles').markAsTouched();
      this.logValidationErrors();
    }, 500);
  }

  logValidationErrors(group: FormGroup = this.userForm): void {
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

  allFormTouched(group: FormGroup) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup)
        this.allFormTouched(abstractControl);
      else
        abstractControl.markAsTouched();
    });
  }

}

function matchPasswords(group: AbstractControl): { [key: string]: any } | null {
  const passwordControl = group.get('password');
  const confirmPasswordControl = group.get('confirmPassword');

  if (passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine)
    return null;
  else
    return { 'passwordMismatch': true };
}
