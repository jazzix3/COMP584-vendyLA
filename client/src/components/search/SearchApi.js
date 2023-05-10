import axios from "axios";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";



export const SearchApi = async (location) => {
    try {
        // GET request to yelp api through server.js
        const response = await axios.get("/api/yelp", {
        params: {
            location: location,
            categories: "streetvendors",
        },
        });
        console.log("Yelp businesses: " + JSON.stringify(response.data));
        // response from yelp stored as objects in an array
        const yelpBusinesses = response.data.businesses;

        // get latlng for the location input and pass to SearchFirestore function
        const latLngResponse = await getLatLng(location);
        console.log("latLngResponse: " + JSON.stringify(latLngResponse));
        

        // return from SearchFirestore stored as objects in array
        const firestoreBusinesses = await SearchFirestore(latLngResponse);

        // combine objects into one array and return
        const BusinessResultsArray = [...firestoreBusinesses,...yelpBusinesses];
    return { businesses: BusinessResultsArray, latLngResponse }

} catch (err) {
    console.error(err);
    throw err;
}
};

    // uses Google API to convert city to lat lng coordinates
export const getLatLng = async (address) => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    const response = await axios.get(url);
    const latLng = response.data.results[0].geometry.location;
    return latLng;
};


const SearchFirestore = async (latLng) => {
    try {
    const lat = JSON.stringify(latLng.lat);
    const lng = JSON.stringify(latLng.lng);

    // Query to databse, returns if business lat is +/- 0.04 (~5 miles) from location user input
    const usersRef = collection(db, "users");
    const latQuery = query(
        usersRef,
        where("business.location.latitude", ">=", parseFloat(lat) - 0.04),
        where("business.location.latitude", "<=", parseFloat(lat) + 0.04),
    );
    const latQuerySnapshot = await getDocs(latQuery);

    // Stores results in an array
    const latBusinessArray = [];
    latQuerySnapshot.forEach((doc) => {
        const business = doc.data().business;
        latBusinessArray.push(business);
    });


    // Repeat for lng
    const lngQuery = query(
        usersRef,
        where("business.location.longitude", ">=", parseFloat(lng) - 0.04),
        where("business.location.longitude", "<=", parseFloat(lng) + 0.04),
    );
    const lngQuerySnapshot = await getDocs(lngQuery);
    const lngBusinessArray = [];
    lngQuerySnapshot.forEach((doc) => {
        const business = doc.data().business;
        lngBusinessArray.push(business);
    });

    // Filter and combine results such that firestoreBusinesses contains businesses once
    const firestoreBusinesses = latBusinessArray.filter((latBusiness) =>
        lngBusinessArray.some((lngBusiness) => latBusiness.businessName === lngBusiness.businessName)
        );

    console.log("firebase businesses:" + JSON.stringify(firestoreBusinesses));

    // returns to Search api function
    return firestoreBusinesses;
    } catch (error) {
    console.error(error);
    throw error;
    }
};
