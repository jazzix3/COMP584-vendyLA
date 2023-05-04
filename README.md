## COMP 584 - Advanced Web Engineering Design Project

### About VendyLA:
Street vendors are underrepresented within other Food/Merch reviewer applications (i.e Yelp). This project's purpose is to bring more clientele to their business.

- Food/Merch application with a focus on street vending in Los Angeles.
- Allow users to find nearby street vendors via location services
- Additional feature if time allows:  Ability to rate and review their food/merchandise.

### Demo Videos:

[Demo 1](https://drive.google.com/file/d/1J9EknQYt1JJPBcGjcG5PDW-Gw0mcM1wT/view?usp=share_link) - Firebase login system and Google Map API implementation\
[Demo 2](https://drive.google.com/file/d/1zzJ4JF1uydUBdL5cpSvwX0ApUMYf9v8n/view?usp=share_link) - Signup fetches user info and creates 'users' documents in Firestore database\
[Demo 3](https://drive.google.com/file/d/136RWjmmE8_TFTrdrsVBujJdFICdb0Pbq/view?usp=share_link) - Functionality to add business information to database. Addresses use Places Autocomplete API. Geocoding marks location on dashboard Google map]


### Requirements:

**Runtime environment:** [Node.js](https://nodejs.org/en/download/)

**Installed libraries:**
<br \>
server:
```
npm i express
npm i nodemon -D
npm i axios
```
client:
```
npm i react-scripts
npm i react-router-dom
npm i bootstrap
npm i react-bootstrap
npm i @react-google-maps/api
npm i firebase
npm i use-places-autocomplete
npm i axios
npm i @reach/combobox --legacy-peer-deps // may need to remove; creates several issues and warnings
```
<br /><br />
Run server using `npm run dev`<br />
Run client using `npm start`
<br /><br />

**$.env.local** file in main folder:
```
REACT_APP_GOOGLE_API_KEY=your_google_api_key

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key

REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain

REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id

REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket

REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id

REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```


