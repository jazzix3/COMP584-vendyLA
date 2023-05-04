import axios from "axios";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";



export const SearchApi = async (location, setLatLng) => {
  try {
    const response = await axios.get("/api/yelp", {
      params: {
        location: location,
        categories: "streetvendors",
      },
    });
    console.log(response.data);
    const yelpBusinesses = response.data.businesses;
    const latLngResponse = await getLatLng(location);
    console.log(latLngResponse);
    setLatLng(latLngResponse);
    const firestoreBusinesses = await SearchFirestore(latLngResponse);

    const BusinessResultsArray = [...firestoreBusinesses,...yelpBusinesses];

    return { businesses: BusinessResultsArray }

  } catch (err) {
    console.error(err);
    throw err;
  }
};

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
      console.log("firebase test:" + parseFloat(lat));
      console.log("firebase test:" + (parseFloat(lat) - 0.08));
  
      const usersRef = collection(db, "users");
      const latQuery = query(
        usersRef,
        where("business.location.latitude", ">=", parseFloat(lat) - 0.08),
        where("business.location.latitude", "<=", parseFloat(lat) + 0.08),
      );
      const latQuerySnapshot = await getDocs(latQuery);
      const latBusinessArray = [];
      latQuerySnapshot.forEach((doc) => {
        const business = doc.data().business;
        latBusinessArray.push(business);
      });
      console.log("firebase lat businesses:" + JSON.stringify(latBusinessArray));
  
      const lngQuery = query(
        usersRef,
        where("business.location.longitude", ">=", parseFloat(lng) - 0.08),
        where("business.location.longitude", "<=", parseFloat(lng) + 0.08),
      );
      const lngQuerySnapshot = await getDocs(lngQuery);
      const lngBusinessArray = [];
      lngQuerySnapshot.forEach((doc) => {
        const business = doc.data().business;
        lngBusinessArray.push(business);
      });
      console.log("firebase lng businesses:" + JSON.stringify(lngBusinessArray));

      const firestoreBusinesses = latBusinessArray.filter((latBusiness) =>
        lngBusinessArray.some((lngBusiness) => latBusiness.businessName === lngBusiness.businessName)
        );

      console.log("firebase businesses:" + JSON.stringify(firestoreBusinesses));

  
      return firestoreBusinesses;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
