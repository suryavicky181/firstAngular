import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { datamodel } from '../employees';



@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})


export class EmployeeDetailsComponent implements OnInit{
  constructor(private fb: FormBuilder, private api:ServiceService) { }


  employeeform!:FormGroup;
  data:undefined|datamodel[]=[];

  ngOnInit(): void {
    
    
    this.employeeform = this.fb.group({
       emp_code:['',Validators.required],
       empName:['',Validators.required],
       age:['',Validators.required],
       designation:['',Validators.required],
       salary:['',Validators.required],
       location:['',Validators.required],
       bloodGroup:['',Validators.required],
      

  })
  this.getemployee();

  }
  createemployee(data:datamodel){
    this.api.createemployee(data).subscribe((res=>{
      this.employeeform.reset();
      this.getemployee(); 
  }))
  

  }
  getemployee(){
    this.api.getemployee().subscribe((res=>{
      this.data=res;
    }))
  }
  deleteemployee(id:number){

  this.api.deleteemployee(id).subscribe((data: datamodel) => {
    console.log(data);
    this.getemployee();
  
  })
}
}

