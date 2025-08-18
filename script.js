document.addEventListener("DOMContentLoaded", () => {
  /* Generate thumbnails for the product images */
  const thumbnailImages = [
    { src: "assets/61Uw0-2+2YL._AC_SL1500_.jpg", alt: "HP Laptop" },
    { src: "assets/81O4hy77G6L._AC_SL1500_.jpg", alt: "" },
    { src: "assets/81aMS5CT+tL._AC_SL1500_.jpg", alt: "" },
    { src: "assets/81EofpdugxL._AC_SL1500_.jpg", alt: "" },
    { src: "assets/81O4hy77G6L._AC_SL1500_.jpg", alt: "" },
    { src: "assets/81O4hy77G6L._AC_SL1500_.jpg", alt: "" },
    { src: "assets/81O4hy77G6L._AC_SL1500_.jpg", alt: "" },
    { src: "assets/81O4hy77G6L._AC_SL1500_.jpg", alt: "" },
  ];

  const THUMBNAIL_DISPLAY_LIMIT = 7;
  const thumbnailList = document.querySelector(".thumbnail-list");
  const mainImage = document.querySelector(".main-image");

  if (thumbnailImages.length > 0) {
    // If we have more images than the limit, show limit-1 thumbnails + "more" button
    if (thumbnailImages.length > THUMBNAIL_DISPLAY_LIMIT) {
      generateThumbnails(thumbnailImages.slice(0, THUMBNAIL_DISPLAY_LIMIT - 1), thumbnailList, mainImage);
      addMoreThumbnail(thumbnailList, thumbnailImages.length, thumbnailImages[THUMBNAIL_DISPLAY_LIMIT - 1]);
    } else {
      generateThumbnails(thumbnailImages, thumbnailList, mainImage);
    }
  }
});

/**
 * Generate thumbnail elements
 */
function generateThumbnails(thumbnailImages, thumbnailList, mainImage) {
  thumbnailImages.forEach((img, idx) => {
    const li = createThumbnailElement(img, idx === 0);

    li.addEventListener("click", () => {
      handleThumbnailClick(li, img, mainImage);
    });

    thumbnailList.appendChild(li);
  });
}

/**
 * Create a thumbnail element
 */
function createThumbnailElement(img, isActive) {
  const li = document.createElement("li");
  li.className = "thumbnail";
  if (isActive) li.classList.add("active");

  const imgElement = document.createElement("img");
  imgElement.src = img.src;
  imgElement.alt = img.alt;

  li.appendChild(imgElement);
  return li;
}

/**
 * Handle thumbnail click event
 */
function handleThumbnailClick(thumbnailElement, img, mainImage) {
  document.querySelectorAll(".thumbnail").forEach((thumb) => thumb.classList.remove("active"));

  thumbnailElement.classList.add("active");
  mainImage.style.backgroundImage = `url("${img.src}")`;
}

/**
 * Add the "more" thumbnail with remaining count and background image
 */
function addMoreThumbnail(thumbnailList, totalCount, backgroundImage) {
  const THUMBNAIL_DISPLAY_LIMIT = 7;
  const hiddenCount = totalCount - THUMBNAIL_DISPLAY_LIMIT + 1;

  const moreLi = document.createElement("li");
  moreLi.className = "thumbnail thumbnail-more";

  // Create an img element like regular thumbnails
  const imgElement = document.createElement("img");
  imgElement.src = backgroundImage.src;
  imgElement.alt = backgroundImage.alt;

  const moreDiv = document.createElement("div");
  moreDiv.textContent = `+${hiddenCount}`;

  moreLi.appendChild(imgElement);
  moreLi.appendChild(moreDiv);
  thumbnailList.appendChild(moreLi);
}
