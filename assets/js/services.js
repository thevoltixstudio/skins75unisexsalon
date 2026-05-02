/*
  Add services below. Format:
  Category | Service name | Price | Description | Image file path OR image URL
*/
const servicesText = `
Hair | Haircut | Rs. 300 | Professional cut with face-shape guidance. | assets/images/services-images/hair-cut.jpg
Hair | Hair Spa | Rs. 1,199 | Deep conditioning treatment for smoother hair. | assets/images/services-images/hair-spa.jpg

Hair | Global Hair Color | Rs. 2,999 | Full-head color with consultation. | assets/images/services-images/hair-color.jpg
Makeup | Party Makeup | Rs. 2,500 | Fresh event-ready makeup and basic hair styling. | assets/images/services-images/makeup-kit.jpg
Makeup | Bridal Makeup | Rs. 7,500 | Complete bridal look with premium products. | assets/images/services-images/bridal-makeup.jpg
Makeup | Engagement Makeup | Rs. 5,500 | Camera-ready makeup for pre-wedding events. | https://lh3.googleusercontent.com/p/AF1QipO1SXTOG80BBdeIl2d-BnvTHMqBCZjQ7oyvLvjZ=s4000
Skin | Fruit Facial | Rs. 799 | Gentle glow facial for regular skin maintenance. | assets/images/services-images/skin-polish.jpg
Skin | Detan Cleanup | Rs. 699 | Quick cleanup for brighter, even-looking skin. | assets/images/services-images/skin-polish.jpg
Skin | Skin Polishing | Rs. 1,499 | Exfoliation and hydration for a smoother finish. | assets/images/services-images/skin-polish.jpg
Nails | Gel Polish | Rs. 499 | Long-lasting glossy nail color. | assets/images/services-images/nail-art.jpg
Nails | Nail Extensions | Rs. 1,999 | Custom length and shape with neat finishing. | https://lh3.googleusercontent.com/p/AF1QipNV3uiBwhhxpDazbnf6Iq0qCmHhplnhnmDZ-fmh=s4000
Nails | Nail Art | Rs. 799 | Creative designs for everyday or occasions. | assets/images/services-images/nail-art.jpg


`;

const servicesByCategory = servicesText
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .reduce((groups, line) => {
    const [category = "Services", name = "", price = "", desc = "", image = "assets/images/services-images/hair-cut.jpg"] = line
      .split("|")
      .map((part) => part.trim());

    if (!groups[category]) {
      groups[category] = {
        category,
        folder: "assets/images/services-images/",
        image,
        items: []
      };
    }

    groups[category].items.push({ name, price, desc, image });
    return groups;
  }, {});

window.Skins75Services = Object.values(servicesByCategory);
