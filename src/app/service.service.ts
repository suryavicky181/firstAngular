import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { datamodel } from './employees';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }


  //post method
  createemployee(data: datamodel) {
    return this.http.post<datamodel>("http://localhost:3000/posts", data)

  }
  //get method
  getemployee() {
    return this.http.get<datamodel[]>("http://localhost:3000/posts");
  }
//first fetch then update
  fetchdata(id: number) {
    return this.http.get<datamodel>(`http://localhost:3000/posts/${id}`);
}
//fetched and shown in formtable... now need to update
updateemployee(employees:datamodel ,id:number){
  console.log(employees);
  
  return this.http.put<datamodel>(`http://localhost:3000/posts/${id}`,employees);

}
deleteemployee(id:number){
  return this.http.delete<datamodel>(`http://localhost:3000/posts/${id}`);

}


}