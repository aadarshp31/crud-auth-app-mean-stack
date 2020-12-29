import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: any[] = []
  isEdit: boolean = false
  SECRET: string = environment.secret

  // Form Data
  _id: string
  name: string
  email: string
  age: Number
  gender: string
  placeOfWork: string
  qualification: string
  user: any = {}


  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    this.UserService.getUsers().subscribe(res => {
      this.users.push(res)
    })
  }

  showUserDialog(id: string) {
    this.getUser(id)
    return this.isEdit = true
  }

  getUser(id: string) {
    return this.UserService.getUser(id).subscribe(res => {
      this._id = res[0]._id
      this.name = res[0].name
      this.email = res[0].email
      this.age = res[0].age
      this.gender = res[0].gender
      this.placeOfWork = res[0].placeOfWork
      this.qualification = res[0].qualification
    })
  }

  updateUserDetails(id: string, data: any) {
    this.user = { name: this.name, email: this.email, age: this.age, gender: this.gender, placeOfWork: this.placeOfWork, qualification: this.qualification }
    return this.UserService.updateUser(id, data)
  }

}
