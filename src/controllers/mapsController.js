const axios = require("axios");

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  throw new Error("GOOGLE_MAPS_API_KEY is missing in environment variables");
}

const getNearbyHospitals = async (req, res) => {
  const { location, radius = 3000 } = req.body;

  if (!location) {
    return res.status(400).json({
      statusCode: 400,
      message: "Location is required",
    });
  }

  try {
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=hospital&key=${API_KEY}`;

    const placesResponse = await axios.get(placesUrl);
    const placesData = placesResponse.data;

    if (!placesData.results || placesData.results.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "No nearby hospitals found",
      });
    }

    const hospitals = placesData.results
      .filter((hospital) => {
        const keywords = ["hospital", "rumah sakit"];
        return keywords.some((keyword) =>
          hospital.name.toLowerCase().includes(keyword)
        );
      })
      .map((hospital) => ({
        name: hospital.name,
        address: hospital.vicinity,
        location: hospital.geometry.location,
      }));

    if (hospitals.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "No valid hospitals found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Nearby hospitals retrieved successfully",
      data: hospitals,
    });
  } catch (error) {
    console.error("Error fetching nearby hospitals:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const getDirections = async (req, res) => {
  const { origin, radius = 5000 } = req.body;

  if (!origin) {
    return res.status(400).json({
      statusCode: 400,
      message: "Origin is required",
    });
  }

  try {
    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${origin}&radius=${radius}&type=hospital&key=${API_KEY}`;
    const nearbyResponse = await axios.get(nearbyUrl);
    const nearbyData = nearbyResponse.data;

    if (!nearbyData.results || nearbyData.results.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "No nearby hospitals found",
      });
    }

    const closestHospital = nearbyData.results[0];

    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${closestHospital.geometry.location.lat},${closestHospital.geometry.location.lng}&key=${API_KEY}`;

    const directionsResponse = await axios.get(directionsUrl);
    const directionsData = directionsResponse.data;

    if (!directionsData.routes || directionsData.routes.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "No directions found",
      });
    }

    const route = directionsData.routes[0].legs[0];
    return res.status(200).json({
      statusCode: 200,
      message: "Directions to the nearest hospital retrieved successfully",
      data: {
        hospital: {
          name: closestHospital.name,
          address: closestHospital.vicinity,
          location: closestHospital.geometry.location,
        },
        distance: route.distance.text,
        duration: route.duration.text,
        steps: route.steps.map((step) => ({
          instruction: step.html_instructions,
          distance: step.distance.text,
          duration: step.duration.text,
        })),
        polyline: directionsData.routes[0].overview_polyline.points,
      },
    });
  } catch (error) {
    console.error("Error fetching directions:", error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getNearbyHospitals,
  getDirections,
};
