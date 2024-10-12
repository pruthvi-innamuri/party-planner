 // Start of Selection
import { Client } from "@googlemaps/google-maps-services-js";
import { places_key } from "./key.js";

const latitude = 37.4161493;
const longitude = -122.0812166; // Mountain View, CA

async function searchPlaces(latitude, longitude, query, type) {
  // const {Place} = await google.maps.importLibrary("places");
  if (!latitude || !longitude || !query || !type) {
      throw new Error('Missing required fields: latitude, longitude, query, type');
  }

  const client = new Client({});

  try {
      const response = await client.textSearch({
          params: {
              key: places_key,
              query: query,
              language: "en-US",
              location: `${latitude},${longitude}`,
              radius: 5000, // 5km radius
              type: type,
          },
      });

      if (response.data.status === 'OK') {
          return response.data.results.map(place => ({
              name: place.name,
              location: place.geometry.location,
              address: place.formatted_address,
              rating: place.rating,
              types: place.types,
              placeId: place.place_id
          }));
      } else {
          throw new Error(`Place search failed. Status: ${response.data.status}`);
      }
  } catch (error) {
      console.error('Error searching for places:', error);
      throw new Error('Error searching for places');
  }
}

const query = 'swimming pools'
const test = async () => {
  const result = await searchPlaces(latitude, longitude, query, "establishment");
  console.log(result);

}

test();
export { searchPlaces };
// module.exports = { searchPlaces };