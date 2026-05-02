/*
  Add home hero images below. Format:
  Image file path OR image URL | Alt text
*/
const heroImagesText = `
assets/images/hero-images/hero-1.jpg | Skins75 salon interior
assets/images/hero-images/hero-2.jpg | Skins75 salon exterior
https://lh3.googleusercontent.com/p/AF1QipObJJtdRXEjGbuz0noWb42O8JeUtMU7kUuejv7Y=s4000
https://lh3.googleusercontent.com/p/AF1QipPE_c3cPdnKhOAxKCLJguJNpHmbV2DXV_FG-3OD=s4000
https://lh3.googleusercontent.com/p/AF1QipO-JJRF5CBFMhlcaWm5UcQj9Zh2OnNwpRciV3Dv=s4000
`;

window.Skins75HeroImages = heroImagesText
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [src = "assets/images/hero-images/hero-1.jpg", alt = "Skins75 salon"] = line
      .split("|")
      .map((part) => part.trim());
    return { src, alt };
  });
