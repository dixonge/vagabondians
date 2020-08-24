
module.exports = (url, alt = "Missing alt text") => {
    return `<picture>
    <source srcset="https://res.cloudinary.com/donblanco/image/upload/dpr_auto,f_auto,q_auto,w_320/Vagabondians/${url}" media="(max-width: 320px)">
    <source srcset="https://res.cloudinary.com/donblanco/image/upload/dpr_auto,f_auto,q_auto,w_375/Vagabondians/${url}" media="(max-width: 375px)">
    <source srcset="https://res.cloudinary.com/donblanco/image/upload/dpr_auto,f_auto,q_auto,w_414/Vagabondians/${url}" media="(max-width: 414px)">
    <source srcset="https://res.cloudinary.com/donblanco/image/upload/dpr_auto,f_auto,q_auto,w_756/Vagabondians/${url}" media="(min-width: 755px)">
    <img src="https://res.cloudinary.com/donblanco/image/upload/dpr_auto,f_auto,q_auto,w_756/Vagabondians/${url}" alt="${alt}" class="mt-1 ml-auto mr-auto" />
  </picture>`;
  };