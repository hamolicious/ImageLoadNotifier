# ImageLoadNotifier
Social media and most messaging apps have a way of telling whether the recipient have read the message. Emails however do not... but what if they did?

## How to run
### From source
`git clone` this repo and run `node install ; node index.js`

### Docker build
`git clone` this repo and run `docker build -t hamolicious/imageloadnotifier:1.0.0 .`, then you can up the image (make sure to forward port `8080` to another port)

### Docker pull
*coming soon*

## Environment Setup
| Environment Variable | Description | Constraints |
| --- | --- | --- |
| `PORT` | Sets the port that the container should run on | n/a |
| `HOST` | Sets the host that the container should use | n/a |
| `DISABLE_TOTP` | Disables all TOTP check **not recommended, used for testing only** | `true or false` |

## Setup
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

## Endpoints
| Name | HTTP Verb | Info | OTP Authentication? |
| --- | --- | --- | --- |
| `/:id.png` | `GET` | Gets the image | ❌ |
| `/get-new-id` | `GET` | Generates a new ID | ✔️ |
| `/get-id-data/:id` | `GET` | Returns the data for the ID | ❌ |
| `/delete-id/:id` | `DELETE` | Returns the data for the ID | ✔️ |
| `/get-all` | `GET` | Returns all data for every ID | ✔️ |

## How to use
*coming soon, too many changes being made right now*