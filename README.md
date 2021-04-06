# Email Client

[![Netlify Status](https://api.netlify.com/api/v1/badges/037dc460-b1d2-4d1c-8abb-386eb387a03d/deploy-status)](https://app.netlify.com/sites/heuristic-kowalevski-98936f/deploys)

One of my all time favorite teachers, [Stephen Grider](https://twitter.com/ste_grider?lang=en), put together an overview of Angular with a much larger scope than this application. However, I thought it would be nice to document my re-discovery process with this final boss of a thing.

The user management, authentication, and email [server](https://api.angular-email.com/) was built by Stephen, as the primary focus for this application is Angular.

## What is this? How do I see it?

A super barebones email client, and you can visit the [app](https://heuristic-kowalevski-98936f.netlify.app/) hosted on [Netlify](https://netlify.com).

You can:

> Note: There is currently a bug in the email server where by the response object will not include an `html` field if you do not
> send test emails to your `angular-email.com` account using the Gmail web client.

- Sign up
- Sign in
- Sign out
- Check your inbox
- Reply to a real email
- Compose and send a real email

## What if I like typing more?

Node and Angular make it really easy to see this in action on your own machine. You'll just need [node](https://nodejs.org/en/) installed first.

1. `git clone https://github.com/ElliottMoos/emailclient.git`
2. `cd emailclient`
3. `npm install`
4. `npm start`
5. It'll be available in the browser at `localhost:4200` in all its glory

### TODOs

- Implement inbox pagination
- Improve Responsiveness
- Styling could use some love
- Attachment support
- Sent emails list
- etc.
