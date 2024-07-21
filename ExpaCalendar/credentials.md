# How to obtain credentials.json

Firstly, create a new project on [Google console](https://console.cloud.google.com/projectcreate).

Now click on Enable Apis and Services
![enable apis and services](enable.jpg)

Search for Google Calendar and enable it.
![google calendar](calendar.jpg)

Under Credentials, configure the consent screen. (select the default and input necessary email adresses and names)
![consent](consent.jpg)

Under credentials click on create credentials and select OAuth client ID
![create](create.jpg)

Select desktop app and click on create.

Then back on the Credentials page click on the newly created OAuth 2.0 Client ID and download the credentials.json file.
![oauth](oauth.jpg)