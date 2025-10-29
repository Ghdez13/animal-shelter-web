// testimonialsData is currently imported from a static JSON file
// Future improvement: fetch testimonials from a backend API
import testimonialsData from "../assets/data/testimonials.json";

/**
 * Fetch testimonials
 * Currently returns static JSON data.
 * In the future, this function can fetch data from an API.
 */
export async function getTestimonials() {
  try {
    // Return static data wrapped in a resolved promise to simulate async behavior
    return Promise.resolve(testimonialsData);

    // Future example for API fetching:
    // const response = await fetch("/api/testimonials");
    // if (!response.ok) throw new Error("Failed to fetch testimonials");
    // return await response.json();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return []; // Return empty array if there’s an error
  }
}