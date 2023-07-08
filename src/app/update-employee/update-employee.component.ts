import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { datamodel } from '../employees';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private router: Router,
    private api: ServiceService, private fb: FormBuilder) { }

  public dataid!: number;
  employees!: datamodel;

  editEmployeeForm!: FormGroup


  ngOnInit(): void {

    this.editEmployeeForm = this.fb.group({
      employee: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', Validators.required],
      location: ['', Validators.required],
      bloodgroup: ['', Validators.required],
      code: ['', Validators.required]
    })


    this.activatedroute.paramMap.subscribe((param: Params) => {
      this.dataid = param['get']("id");
      console.log("data id is", this.dataid)
    })


    this.api.fetchdata(this.dataid).subscribe((data: datamodel) => {
      console.log(data);
      this.editEmployeeForm.patchValue({
        employee: data.employee,
        name: data.name,
        age: data.age,
        designation: data.designation,
        salary:data.salary, 
        location: data.location,
        bloodgroup:data.bloodgroup, 
        code: data.code,
      })   
      
    })

  }
  update(){
    this.api.updateemployee(this.editEmployeeForm.value,this.dataid).subscribe((res:datamodel)=>{
      this.router.navigate(["/"]) 
    })
    
  
 }
  // update(){
  //   this.api.updateemployee(this.employees,this.dataid).subscribe((res:datamodel)=>{
  //     this.router.navigate(["/"])
  //     this.editEmployeeForm.reset();

  //   })
  // }
  // this.getemployee(); 
  

}




