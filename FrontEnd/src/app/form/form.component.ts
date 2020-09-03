import { Component, OnInit } from '@angular/core';
import { Form } from '../../data/form';
import Swal from 'sweetalert2';

import { UserServiceService } from '../user-service.service';
// import { formatDate } from "@angular/common";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  tempIDNum: Number;
  tempname: String;
  tempemail: String;
  tempnumbook: String;
  tempitems: String;
  temptitle: String;
  tempdateborrow: String;
  tempdatereturn: String;
  formdata: Form;
  editing = false;

  hide = false;
  tolist = false;
  date=[];



  dataArray: Form[] = [];

  constructor(private http: UserServiceService) {
    this.formdata = new Form();
  }

  ngOnInit() {
    this.http.getHttp().subscribe((data: any) => {
      this.dataArray = data.data;
      console.log(this.dataArray)
    });

  }

  onSubmit() {

    Swal.fire({
      title: 'Are you sure to Submit?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Submitted!',
          'Successfully Submitted',
          'success'
        )

        this.formdata = {
          id: this.tempIDNum,
          fullname: this.tempname,
          email: this.tempemail,
          bookTitle: this.temptitle,
          bookNumber: this.tempnumbook,
          bookItems: this.tempitems,
          dateBorrow: this.tempdateborrow,
          dateReturn: this.tempdatereturn,
        }
        this.http.postHttp(this.formdata).subscribe((data: any) => {
          data = this.formdata
          this.dataArray.push(data);
          console.log("Data: ", this.dataArray)
        })
        this.hide = true,
          this.tolist = true,
          this.tempIDNum = null,
          this.tempname = "",
          this.tempemail = "",
          this.tempnumbook = "",
          this.tempitems = "",
          this.temptitle = "",
          this.tempdateborrow = "",
          this.tempdatereturn = ""
      }
    })
  }

  list() {
    this.tolist = true;
    this.hide = true;
    this.editing = true;

  }
  library() {
    this.tolist = false;
    this.hide = false;
    this.editing = false

  }
  editParent(id) {
    this.dataArray.forEach(element => {
      if (element.id == id) {
        this.tempname = element.fullname;
        this.tempemail = element.email;
        this.tempnumbook = element.bookNumber;
        this.tempitems = element.bookItems;
        this.tempemail = element.email;
        this.temptitle = element.bookTitle;
        this.tempdateborrow = element.dateBorrow;
        this.tempdatereturn = element.dateReturn;

        this.editing = true;
        this.tempIDNum = id;
      }
    });
    this.hide = false;
  }

  handleSave() {
    const body = {
      fullname: this.tempname,
      email: this.tempemail,
      bookNumber: this.tempnumbook,
      bookItems: this.tempitems,
      bookTitle: this.temptitle,
      dateBorrow: this.tempdateborrow,
      dateReturn: this.tempdatereturn,
    }
    this.http.putHttp(this.tempIDNum, body).subscribe((data: any) => {
      this.dataArray.forEach(element => {
        if (element.id == this.tempIDNum) {
          element.fullname = this.tempname;
          element.email = this.tempemail;
          element.bookNumber = this.tempnumbook;
          element.bookItems = this.tempitems;
          element.bookTitle = this.temptitle;
          element.dateBorrow = this.tempdateborrow;
          element.dateReturn = this.tempdatereturn;
        }
      })
      this.hide = true;
      this.tempIDNum = null,
        this.tempname = "",
        this.tempemail = "",
        this.tempnumbook = "",
        this.tempitems = "",
        this.temptitle = "",
        this.tempdateborrow = "",
        this.tempdatereturn = ""
    })
  }
  delete(id) {
    this.http.deleteHttp(id).subscribe((data: any) => {

    })
  }




}
