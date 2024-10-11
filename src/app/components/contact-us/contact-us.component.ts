import { Component, ViewChild } from '@angular/core';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharingService } from '../../core/services/sharing.service';
import { CommonModule } from '@angular/common';
import { ContactUsService } from '../../core/services/contact-us.service';
import { ToastrService } from 'ngx-toastr';
import { RecaptchaModule, RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RecaptchaModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  serviceList!: any[];
  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    service: new FormControl(null, [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    recaptcha: new FormControl('', [Validators.required]),
  });
  constructor(
    private sharingService: SharingService,
    private service: ContactUsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sharingService.getServiceData().subscribe({
      next: (res) => {
        const response = JSON.stringify(res);
        this.serviceList = JSON.parse(response);
      },
    });
  }
  spinner: boolean = false;
  message: boolean = false;
  @ViewChild('recaptcha') recaptcha!: RecaptchaComponent;
  submit() {
    // if (this.contactForm.valid && this.captchaResponse) {
    if (this.contactForm.valid) {
      this.spinner = true;
      this.service
        .postContactForm({
          name: this.contactForm.value.name,
          company: this.contactForm.value.company,
          phone: JSON.stringify(this.contactForm.value.phone),
          email: this.contactForm.value.email,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message,
          service: this.contactForm.value.service,
        })
        .subscribe({
          next: (res) => {
            this.toastr.success('Form has been submitted.', 'Success!');
            this.spinner = false;
            this.contactForm.reset();
            this.recaptcha.reset();
          },
        });
    } else {
      Object.keys(this.contactForm.controls).forEach((controlName) => {
        const control = this.contactForm.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  isControlInvalid(controlName: string) {
    const control = this.contactForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  onCaptchaResolved(captchaResponse: string | null) {
    this.contactForm.controls['recaptcha'].setValue(captchaResponse);
  }
}
