/*
  Add reviews below. Format:
  Review text | Customer name | Role
*/
const reviewsText = `
Haircut aur styling dono bahut clean the. Team ne aftercare bhi clearly bataya. | Ananya S. | Hair client

Mera bridal makeup full event me fresh raha. Photos me finish amazing aaya. | Priya M. | Bride

Academy course practical tha. First week se hi hands-on learning start ho gayi. | Rohit K. | Academy student

Skin cleanup ke baad instant freshness feel hui. Staff polite aur hygienic hai. | Neha P. | Skin client

I recently visited this parlour for a haircut and I'm thoroughly impressed with the service.The staff were extremely courteous and welcoming. The hairstylist (Moin) did an amazing job - very skilled and professional. The overall experience was top-notch and I'd highly recommend this parlour to anyone looking for great service and a great haircut👍 | Surbhi Kumari | Hair Client

Hm hair cutting and fecial and detan liye mereko services bahutaccha laga skin75ka or yaha ka staff bhi bahut accha hai yaha ka all services bahut accha hai thank you so much skin 75 ap bhi yaha akar services le sakte hai bahut accha hai 👍👍👍 … | Sudha Moses | Skin CLient

`;

window.Skins75Reviews = reviewsText
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [quote = "", name = "", role = ""] = line.split("|").map((part) => part.trim());
    return { quote, name, role };
  });
