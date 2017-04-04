# react-server-app
React app and Node server for basket signups with localization.

## To use and configure
Copy these files into a new repo. Configure values in sample.env. Start making changes to src/ locales/ and less/.

## Setup

```
$> npm install
$> cp sample.env .env
```

## To run

```
$> npm start
```

## Environment Variables

You can configure the following environment variables:

|Variable|About|
|--------|-----|
| OPTIMIZELY_ID | Optimizely Project ID (not a secret) e.g. '206878104' |
| OPTIMIZELY_ACTIVE | If set to 'yes' (String) the project will include Optimizely snippet in the page load |
| SUPPORTED_LOCALES | If set to '*' all locales under `intl-config.js` file for `src` will be enabled otherwise it expects array of locales.
| FULL_SUBDOMAIN | Used for page title and optimizely.
| SOURCEURL | The URL to send to Basket during a signup.

