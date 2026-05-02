/*
  Add portfolio items below. Format:
  Title | Category | Image file path OR image URL
*/
const portfolioText = `
Classic Bridal Look | Bridal | assets/images/portfolio-images/portfolio-bridal.jpg
Reception Glow | Bridal | assets/images/portfolio-images/portfolio-bridal-2.jpg
Layered Haircut | Hair | assets/images/portfolio-images/portfolio-hair.jpg
Warm Balayage | Hair | assets/images/portfolio-images/portfolio-hair-2.jpg
Party Glam | Makeup | assets/images/portfolio-images/portfolio-makeup.jpg
Natural Day Makeup | Makeup | assets/images/portfolio-images/portfolio-makeup-2.jpg



`;

const portfolioGallery = portfolioText
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [title = "", category = "", image = "assets/images/portfolio-images/portfolio-hair.jpg"] = line
      .split("|")
      .map((part) => part.trim());
    return { title, category, image };
  });

window.Skins75Portfolio = {
  folder: "assets/images/portfolio-images/",
  filters: ["All", ...Array.from(new Set(portfolioGallery.map((item) => item.category).filter(Boolean)))],
  gallery: portfolioGallery
};
