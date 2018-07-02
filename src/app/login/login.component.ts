import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../classes/login/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  controls: {}
  formGroup: FormGroup

  constructor(private userSvc: UserService,
              private fb: FormBuilder,
              private router: Router) {

    let usernameCtrl = new FormControl()
    usernameCtrl.setValidators([Validators.pattern(/.+/)])

    let passwordCtrl = new FormControl()
    passwordCtrl.setValidators([Validators.pattern(/.+/)])

    this.formGroup = this.fb.group({})
    this.formGroup.addControl('username', usernameCtrl)
    this.formGroup.addControl('password', passwordCtrl)
  }

  ngOnInit() {
  }

  login() {
    if (this.formGroup.status === 'VALID') {
      this.userSvc.login(this.formGroup.value.username, this.formGroup.value.password)
        .subscribe(r => {
          this.userSvc.user = new User(r.id, r.username, r.token)
          this.router.navigate(['/blog'])
        })
    }
  }

}
