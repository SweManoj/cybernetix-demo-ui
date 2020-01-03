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
      pattern: 'Invalid Email Pattern'
    },
    phoneNumber: {
      required: 'Phone Number is required',
      pattern: 'Invalid Phone Number',
      minlength: 'Phone Number must be atleast 8 numbers'
    },
    password: {
      required: 'Password is required',
      passwordShortLength: 'Password must be atleast 8 Characters',
      passwordLongLength: 'Password must not contains more than 20 Characters',
      passwordNotDigit: 'Password Must contain atleast 1 number',
      passwordNotSmallLetter: 'Password Must contain atleast 1 small letter',
      passwordNotCapsLetter: 'Password Must contain atleast 1 capital letter',
      passwordNotSpecialLetter: 'Password Must contain atleast 1 special character $@$!%*?&#^_+.,:;'
    },
    confirmPassword: {
      required: 'Confirm Password is required'
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
      email: ['', [Validators.required, Validators.pattern('([A-Za-z0-9._%-]{3,})+@([A-Za-z0-9._%-]{2,})+\\.[a-z]{2,3}')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]], // (0 | 91)?[6-9][0-9]{9}
      userStatus: ['deactivate'],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordCustomPattern]],
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

  // manually invoke the error of role select box at 1st time only, if not select anythings
  roleClick() {
    if (!this.userForm.get('roles').touched) {
      setTimeout(() => {
        this.userForm.get('roles').markAsTouched();
        this.logValidationErrors();
      }, 500);
    }
  }

  logValidationErrors(group: FormGroup = this.userForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';

      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          // only add the first error msg, or else it will print entire error object - this.formErrors[key] == ''
          if (errorKey && this.formErrors[key] == '') {
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

function passwordCustomPattern(group: AbstractControl): { [key: string]: any } | null {

  const passwordValue = group.value;
  if (passwordValue.length > 0) {
    if (passwordValue.length < 8)
      return { 'passwordShortLength': true };
    else if (passwordValue.length > 50)
      return { 'passwordLongLength': true };
    else if (passwordValue.search(/\d/) == -1)
      return { 'passwordNotDigit': true };
    else if (passwordValue.search(/[a-z]/) == -1)
      return { 'passwordNotSmallLetter': true };
    else if (passwordValue.search(/[A-Z]/) == -1)
      return { 'passwordNotCapsLetter': true };
    else if (passwordValue.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) == -1)
      return { 'passwordNotSpecialLetter': true };
    else
      return null;
  } else
    return null;
}