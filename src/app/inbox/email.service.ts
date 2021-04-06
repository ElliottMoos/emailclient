import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email';

export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com';
  constructor(private client: HttpClient) {}

  getEmails() {
    return this.client.get<EmailSummary[]>(`${this.rootUrl}/emails`);
  }

  getEmail(id: string) {
    return this.client.get<Email>(`${this.rootUrl}/emails/${id}`);
  }

  sendEmail(email: Email) {
    return this.client.post(`${this.rootUrl}/emails`, email);
  }
}
