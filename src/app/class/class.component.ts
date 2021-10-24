import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  displayedColumns: string[] = ['id', 'code', 'name', 'maximum_students', 'status', 'actions'];
  class_list: any;
  passtodelete_: any;
  u_name: string | undefined;
  u_code: any;
  u_id: any;
  students_list: any;
  u_maximum_students: any;
  u_description: any;
  u_status: any;
  item_id: any;
  //  

  selectedItems = Array();


  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'first_name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  data: any;
  constructor(private dataService: DataService) { }

  get_students_list() {
    this.dataService.get_students_list().subscribe(
      (response) => { console.log(response); this.students_list = response; },
      (error) => { console.log(error); });
  }
  ngOnInit() {
    this.get_students_list();
    this.get_class_list();

  }
  get_class_list() {
    this.dataService.get_class_list().subscribe(
      (response) => { console.log(response); this.class_list = response; },
      (error) => { console.log(error); });
  }
  onItemSelect(item: any) {
    this.selectedItems.push(item['id']);
  }
  onItemDeSelect(item: any) {
    console.log('onItemDeSelect', item);
  }
  add_class(code: any, description: any, name: any, maximum_students: any, status: any) {
    // console.log(this.selectedItems);
    this.dataService.add_class({ code, description, name, maximum_students, status, 'selectedItems': this.selectedItems }).subscribe(
      (response) => {
        this.get_class_list();
      },
      (error) => { console.log(error); });
  }
  update_class(code: any, description: any, name: any, maximum_students: any, status: any) {
    this.dataService.update_class({ 'id': this.u_id, code, description, name, maximum_students, status, 'selectedItems': this.selectedItems }).subscribe(
      (response) => {
        console.log(response);
        this.get_class_list();
      },
      (error) => { console.log(error); });
  }
  delete_class() {
    this.dataService.delete_class({ 'id': this.passtodelete_ }).subscribe(
      (response) => {
        console.log(response);
        this.get_class_list();
      },
      (error) => { console.log(error); });
  }

  passtoupdate(data: any) {
    this.u_id = data['id'];
    this.u_name = data['name'];
    this.u_code = data['code'];
    this.u_maximum_students = data['maximum_students'];
    this.u_description = data['description'];
    this.u_status = data['status'];
  };
  passtodelete(data: any) {
    this.passtodelete_ = data;
  };
}
