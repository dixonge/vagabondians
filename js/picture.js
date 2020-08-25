
module.exports = (url, alt = "Missing alt text") => {
    return `
    <img src="https://res.cloudinary.com/donblanco/image/upload/dpr_auto,f_auto,q_auto/Vagabondians/${url}" alt="${alt}" srcset="https://res.cloudinary.com/donblanco/image/upload/dpr_auto,f_auto,q_auto,w_320/Vagabondians/${url} 320w, https://res.cloudinary.com/donblanco/image/upload/dpr_auto,f_auto,q_auto,w_375/Vagabondians/${url} 375w, https://res.cloudinary.com/donblanco/image/upload/dpr_auto,f_auto,q_auto,w_414/Vagabondians/${url} 414w, https://res.cloudinary.com/donblanco/image/upload/dpr_auto,f_auto,q_auto,w_756/Vagabondians/${url} 756w" />
  `;
  };