import testimonialsData from "../assets/data/testimonials.json";

// For now it reads from JSON, in the future it could fetch from a backend
export async function getTestimonials() {
  return testimonialsData;
}
