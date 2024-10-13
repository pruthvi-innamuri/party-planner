 // Start of Selection
import { Client } from "@googlemaps/google-maps-services-js";
import { places_key } from "./key.js";

export const latitude = 37.4161493;
export const longitude = -122.0812166;

async function searchPlaces(query, type) {
  // const {Place} = await google.maps.importLibrary("places");
  console.log(`Searching for ${query} of type ${type}`);
  if (!query || !type) {
      throw new Error('Missing required fields: query, type');
  }

  const client = new Client({});

  try {
      console.log(`Searching for ${query} of type ${type}`);
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
        
          const results = response.data.results.slice(0, 5).map(place => ({
              name: place.name,
              location: place.geometry.location,
              address: place.formatted_address,
              rating: place.rating,
              types: place.types,
              placeId: place.place_id
          }));
          console.log('Search results:', results);
          return results.map(place => ({
              name: place.name,
              address: place.address
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
  const result = await searchPlaces( query, "establishment");
  console.log(result);

}
export { searchPlaces };
// module.exports = { searchPlaces };