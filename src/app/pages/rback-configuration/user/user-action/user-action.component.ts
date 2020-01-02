import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    'firstName': {
      'required': 'Role Name is required',
      'minlength': 'First Name must be greater than 4 characters'
    },
    'lastName': {
      'required': 'Last Name is required',
    },
    'userName': {
      'required': 'User Name is required',
      'minlength': 'User Name must be greater than 4 characters',
    },
    'phoneNumber': {
      'required': 'Phone Number is required'
    },
    'email': {
      'required': 'Email is required'
    },
    'password': {
      'required': 'Password is required'
    },
    'confirmPassword': {
      'required': 'confirm is required'
    },
    'roles': {
      'required': 'Please Select the Roles'
    }
  };

  formErrors = {
    'roleName': '',
    'permissions': ''
  };

  initUserForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.minLength(4)]],
      phoneNumber: ['', [Validators.required]]
    });
  }

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
          // this.roleSettings.disabled = true;
        }
      });
    }
  }


  previousPage() {
    this.location.back();
  }

}
