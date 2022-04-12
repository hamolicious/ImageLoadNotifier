# ImageLoadNotifier
Social media and most messaging apps have a way of telling whether the recipient have read the message. Emails however do not... but what if they did?

# How to run
## From source
`git clone` this repo and run `node install ; node index.js`

## Docker build
`git clone` this repo and run `docker build -t hamolicious/imageloadnotifier:1.0.0 .`, then you can up the image (make sure to forward port `8080` to another port)

## Docker pull
*coming soon*

# Environment Setup
| Environment Variable | Description | Constraints |
| --- | --- | --- |
| `PORT` | Sets the port that the container should run on | n/a |
| `HOST` | Sets the host that the container should use | n/a |
| `DISABLE_TOTP` | Disables all TOTP check **not recommended, used for testing only** | `true or false` |

# Setup
After starting the server, you should see an output like this:
```
Setting up server...
Setting up OTP...
Looks like you're missing a secret.key file...
Creating file...
Created file...
Setting up routes...
Starting server...
Server listening on port 8080
```
You can then open the `tempQRCode.png` file and use the [Google Authenticator App](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_GB&gl=US) (GAA) to scan the QR code.

# How to use
There are 2 important endpoints:
## Get `/generate-key`
Set the `totp` header to the code from the GAA and make a `get` request, you should get something like this back:
```json
{
	"key": "DytUkainXomRjtXqEXMXJsiuajJwNrDtGtWOShjgqiEARwIlhDRKmmfKCSoHoHM",
	"link": "hamolicious.ddns.net/DytUkainXomRjtXqEXMXJsiuajJwNrDtGtWOShjgqiEARwIlhDRKmmfKCSoHoHM.png",
	"data": "hamolicious.ddns.net/get-key-data/DytUkainXomRjtXqEXMXJsiuajJwNrDtGtWOShjgqiEARwIlhDRKmmfKCSoHoHM",
	"code": "<img src=\"hamolicious.ddns.net/DytUkainXomRjtXqEXMXJsiuajJwNrDtGtWOShjgqiEARwIlhDRKmmfKCSoHoHM.png\">"
}
```
You can then embed the image code into an email.

## Get `/get-key-data/:id`
`Get` this endpoint like so `/get-key-data/DytUkainXomRjtXqEXMXJsiuajJwNrDtGtWOShjgqiEARwIlhDRKmmfKCSoHoHM`, this will return something like this:
```json
{
	"data": {
		"createdOn": 1649763936267,
		"accessedOn": false
	}
}
```
When the image is requested, the data will change to:
```json
{
	"data": {
		"createdOn": 1649763936267,
		"accessedOn": 1649764355242
	}
}
```
*Both timestamps are in UTC format.*

# TODO
This is by no way a finished project, there is too much to add. Some of the main features I want to add are:
 - [ ] A modular reporting system, the ability to write plugins to allow for email, text, discord, etc. reporting.
 - [ ] A web interface.
 - [ ] Webhooks
 - [ ] Multiple requests storage
 - [ ] Removing unused id's (currently, there is no way to delete a generated key, you have to restart the server 😅)

