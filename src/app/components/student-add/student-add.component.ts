import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  studentForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router) {
    this.studentForm = this.formBuilder.group({
      name: [''],
      studentid: [''],
      major: ['']
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    let student = new Student();
    student.name = this.studentForm.controls['name'].value;
    student.major = this.studentForm.controls['major'].value;
    student.studentid = this.studentForm.controls['studentid'].value;

    this.studentService.createNewStudent(student).subscribe({
      next: res => {
        this.router.navigateByUrl('/student');
      },
      error: err => { }
    });
  }
}
