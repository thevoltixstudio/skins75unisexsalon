/*
  Add courses below. Format:
  Title | Duration | Price | Image file path OR image URL | Feature 1, Feature 2, Feature 3
*/
const coursesText = `
Basic Hair Styling | 4 weeks | Rs. 15,000 | assets/images/courses-images/hair-care.jpg | Hair sectioning, Blow dry techniques, Iron curls and waves, Client consultation
Professional Makeup | 6 weeks | Rs. 25,000 | assets/images/courses-images/bridal-makeup.jpg | Base correction, Eye makeup, Bridal looks, Product knowledge
Skin Care Fundamentals | 3 weeks | Rs. 12,000 | assets/images/courses-images/skin-glow.jpg | Skin analysis, Facial steps, Cleanup routines, Hygiene standards
Nail Technician Course | 4 weeks | Rs. 18,000 | assets/images/courses-images/nail-art.jpg | Gel polish, Extensions, Nail art, Aftercare guidance




`;

window.Skins75Courses = coursesText
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [title = "", duration = "", price = "", image = "assets/images/courses-images/hair-care.jpg", featuresText = ""] = line
      .split("|")
      .map((part) => part.trim());
    const features = featuresText
      .split(",")
      .map((feature) => feature.trim())
      .filter(Boolean);
    return { title, duration, price, image, features };
  });
