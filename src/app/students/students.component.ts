import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent implements OnInit {
  constructor(private dataService: DataService, private calendar: NgbCalendar) { }
  'model': NgbDateStruct;
  // 'model': NgbDatepicker;
  'date': { year: number, month: number };
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'date_of_birth', 'actions'];
  students_list: any;
  passtodelete_: any;
  u_first_name: string | undefined;
  u_last_name: any;
  u_id: any;
  u_date_of_birth: any;
  // 
  data: any;

  Update_students(dob: any, last_name: any, first_name: any) {
    this.dataService.update_student({ 'id': this.u_id, 'dob': '2000-10-22', first_name, last_name }).subscribe(
      (response) => {
        this.get_students_list();
      },
      (error) => { console.log(error); });
    this.get_students_list();
  };
  passtoupdate(data: any) {
    this.u_id = data['id'];
    this.u_first_name = data['first_name'];
    this.u_last_name = data['last_name'];
    this.u_date_of_birth = data['date_of_birth'];
  };
  passtodelete(data: any) {
    this.passtodelete_ = data;
  };
  add_students(dob: any, first_name: any, last_name: any) {
    console.log(dob);
    console.log(new Date(dob.year, dob.month - 1, dob.day));
    this.dataService.add_student({ 'dob': new Date(dob.year, dob.month - 1, dob.day), first_name, last_name }).subscribe(
      (response) => {
        console.log(response);
        this.get_students_list();
      },
      (error) => { console.log(error); });
    this.get_students_list();
  };
  ngOnInit() {
    this.get_students_list();
  }
  get_students_list() {
    this.dataService.get_students_list().subscribe(
      (response) => { console.log(response); this.students_list = response; },
      (error) => { console.log(error); });
  }
  update_student(dob: any, first_name: any, last_name: any) {
    this.dataService.update_student({ 'id': this.u_id, 'dob': '2000-10-22', first_name, last_name }).subscribe(
      (response) => {
        console.log(response);
        this.get_students_list();
      },
      (error) => { console.log(error); });
  }
  delete_student() {
    this.dataService.delete_student({ 'id': this.passtodelete_ }).subscribe(
      (response) => {
        console.log(response);
        this.get_students_list();
      },
      (error) => { console.log(error); });
  }
}