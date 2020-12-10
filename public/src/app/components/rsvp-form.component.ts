import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rsvp-form',
  templateUrl: './rsvp-form.component.html',
  styleUrls: ['./rsvp-form.component.css']
})
export class RsvpFormComponent implements OnInit {

  newRSVPForm : FormGroup
  result: boolean = true
  errorResult = {}

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.newRSVPForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.email]),
      phone  : this.fb.control(''),
      answer: this.fb.control('', [Validators.required]),
    })

    this.newRSVPForm.get('email').invalid 
  }

  
  async submitRSVP(){
    const rsvpData = new HttpParams()
    .set('name', this.newRSVPForm.get('name').value)
    .set('email', this.newRSVPForm.get('email').value)
    .set('phone', this.newRSVPForm.get('phone').value)
    .set('answer', this.newRSVPForm.get('answer').value)

    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
//    .set('Access-Control-Allow-Origin', 'http://localhost:4200');

    // const result = await this.http.post('/order', rsvpData.toString(), {headers: httpHeaders}).toPromise()  
       await this.http.post('/rsvp', rsvpData.toString(), {headers: httpHeaders}).toPromise().then(
        () => {
          // success callback
          // window.alert('Order Added!')
          this.result = true

        },
        (response) => {
          // failure callback,handle error here
          // response.data.message will be "This is an error!"
          this.result = false
          this.errorResult = response
          // console.log(response)
          // window.alert(response.error.message)
        }
      )

      console.info(this.result)

     if (this.result){
        this.router.navigate(['/confirmation']) 
     }
     else{
        this.router.navigate(['/error'], {
          state: {
            errorResult: JSON.stringify(this.errorResult)
          }
        }) 
     }  
  }

}
