import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() passData: Array<any>;
  @Output() editData = new EventEmitter();
  @Output() emitdelete = new EventEmitter();
  searchText: string;
  

  constructor() { }

  ngOnInit() {
  }
  handleDelete(id) {
    Swal.fire({
      title: 'Do you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Information deleted.',
          'success'
        )
        console.log("my id: ",id)
        this.emitdelete.emit(id)
        const index = this.passData.findIndex(each => {
          return (each.id == id)})
        this.passData.splice(index, 1);
      }
    })


  }
  handleEdit(id) {
    this.editData.emit(id);
  }



}
