/*
  Add team members below. Format:
  Name | Role | Bio | Image file path OR image URL
*/
const teamMembersText = `
Sana Khan | Creative Hair Director | Precision cuts, color correction and styling education. | assets/images/team-member-images/team-1.svg
Meera Shah | Senior Makeup Artist | Bridal, party and editorial looks with skin-first prep. | assets/images/team-member-images/team-2.svg
Arjun Rao | Skin and Nail Specialist | Facial care, nail extensions and hygiene-focused training. | assets/images/team-member-images/team-3.svg


`;

window.Skins75Team = teamMembersText
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [name = "", role = "", bio = "", image = "assets/images/team-member-images/team-1.svg"] = line
      .split("|")
      .map((part) => part.trim());
    return { name, role, bio, image };
  });
