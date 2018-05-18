import { Injectable } from "@angular/core";
import { Http, RequestMethod, Headers } from "@angular/http";
import { Response, Request, RequestOptions } from "@angular/http";
import { Employee } from "../models/employee.model";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Service{

    extractLanguages(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    constructor(private http: Http){

    }


    private extractData(res: Response){
        let body = res.json();
        return body.fields || {};
    }

    private handleError(error: any){
        console.error('post error: ', error);
        return Observable.throw(error.statusText);
    }

    postEmployee(employee : Employee) : Observable<any>{
        console.log('posting employee:', employee);
        
        let body = JSON.stringify(employee);
        let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json'})});       

        return this.http.post('http://127.0.0.1:3100/postemployee', body, options)
        .map(this.extractData)
        .catch(this.handleError);

    }

    getLanguages() : Observable<any>{
        return this.http.get('http://127.0.0.1:3100/get-employee')
        .delay(5000)
        .map(this.extractLanguages)
        .catch(this.handleError);
    }
}
