import { EmailSummary } from './email.service';
export interface Email extends EmailSummary {
  text: string;
  to: string;
  // If you do not use Gmail's web client to send
  // your angular-email account an email, an `html` field won't be returned with the
  // response object.
  html?: string;
}
