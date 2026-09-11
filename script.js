const catalog = document.getElementById("catalogo");
const openCatalog = document.getElementById("openCatalog");
const introMessage = document.getElementById("introMessage");
const siteLogo = document.querySelector(".site-logo");
const closeCatalog = document.getElementById("closeCatalog");
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".product-card");
const todoPieces = document.querySelectorAll(".todo-piece");
const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalArt = document.getElementById("modalArt");
const closeModal = document.getElementById("closeModal");

let introShowTimer;
let introOpenTimer;
let introCloseTimer;

function openPortfolio() {
  clearTimeout(introShowTimer);
  clearTimeout(introOpenTimer);
  clearTimeout(introCloseTimer);

  introMessage.classList.remove("show");

  catalog.classList.add("open");
  catalog.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  siteLogo.classList.add("catalog-hidden");
}

openCatalog.addEventListener("click", () => {

  // Mantiene exactamente la animación actual de la cara
  openCatalog.classList.add("doodles-active");

  // Después de que termine la animación de la portada,
  // aparece la pequeña presentación
  introShowTimer = setTimeout(() => {
    introMessage.classList.add("show");
  }, 2050);

  // Después de mostrar la presentación,
  // desaparece y se abre el catálogo
  introOpenTimer = setTimeout(() => {
    introMessage.classList.remove("show");

    introCloseTimer = setTimeout(() => {
      openPortfolio();
    }, 450);
  }, 4500);

});

// Si se hace clic en la tarjeta de presentación, se entra directamente al portfolio.
introMessage.addEventListener("click", (event) => {
  event.stopPropagation();
  openPortfolio();
});

closeCatalog.addEventListener("click", () => {
  catalog.classList.remove("open");
  catalog.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  siteLogo.classList.remove("catalog-hidden");
});

function setCategory(category) {
  cards.forEach(card => {
    card.style.display =
      category === "todos" || card.dataset.category === category
        ? ""
        : "none";
  });

  catalog.classList.toggle("is-todo", category === "todos");
  catalog.classList.toggle("is-complementos", category === "ceramica");
  catalog.classList.toggle("is-decor", category === "joyas");
  catalog.classList.toggle("is-illustration", category === "ilustracion");
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
    setCategory(filter.dataset.filter);
  });
});

// La categoría inicial es "De to' un poco" porque es la pestaña activa al cargar.
setCategory(document.querySelector(".filter.active")?.dataset.filter || "todos");

cards.forEach(card => {
  card.addEventListener("click", () => {

    const image = card.dataset.image;

    if (image) {
      modalArt.innerHTML = `
        <img src="${image}" alt="Ilustración ampliada">
      `;
    } else {
      const art = card.querySelector(".product-image");
      modalArt.innerHTML = art.innerHTML;
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function hideModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
closeModal.addEventListener("click", hideModal);
document.querySelector(".modal-backdrop").addEventListener("click", hideModal);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    hideModal();
    if (catalog.classList.contains("open")) closeCatalog.click();
  }
});


// Galería de Complementos: piezas recortadas en PNG
const complementosPieces = document.querySelectorAll(".complementos-piece");

complementosPieces.forEach(piece => {
  piece.addEventListener("click", () => {
    const image = piece.querySelector("img");
    if (!image) return;

    modalTitle.textContent = piece.dataset.name || "";
    modalDescription.textContent = piece.dataset.description || "";
    modalPrice.textContent = piece.dataset.price || "";
    modalArt.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

// Galería de Decor: piezas recortadas en PNG
const decorPieces = document.querySelectorAll(".decor-piece");

decorPieces.forEach(piece => {
  piece.addEventListener("click", () => {
    const image = piece.querySelector("img");
    if (!image) return;

    modalTitle.textContent = piece.dataset.name || "";
    modalDescription.textContent = piece.dataset.description || "";
    modalPrice.textContent = piece.dataset.price || "";
    modalArt.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

// Galería de De to' un poco: piezas recortadas en PNG
todoPieces.forEach(piece => {
  piece.addEventListener("click", () => {
    const image = piece.querySelector("img");
    if (!image) return;

    modalTitle.textContent = piece.dataset.name || "";
    modalDescription.textContent = piece.dataset.description || "";
    modalPrice.textContent = piece.dataset.price || "";
    modalArt.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});



// Ampliar ilustraciones al hacer clic
const illustrationPieces = document.querySelectorAll(".illustration-piece");
const illustrationLightbox = document.getElementById("illustrationLightbox");
const illustrationLightboxImage = document.getElementById("illustrationLightboxImage");
const closeIllustration = document.getElementById("closeIllustration");

function openIllustration(piece) {
  const image = piece.querySelector("img");
  if (!image) return;
  illustrationLightboxImage.src = image.src;
  illustrationLightboxImage.alt = image.alt;
  illustrationLightbox.classList.add("open");
  illustrationLightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeIllustrationLightbox() {
  illustrationLightbox.classList.remove("open");
  illustrationLightbox.setAttribute("aria-hidden", "true");
  illustrationLightboxImage.src = "";
  document.body.style.overflow = catalog.classList.contains("open") ? "hidden" : "";
}

illustrationPieces.forEach(piece => {
  piece.addEventListener("click", () => openIllustration(piece));
  piece.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openIllustration(piece);
    }
  });
});

closeIllustration.addEventListener("click", closeIllustrationLightbox);
document.querySelector(".illustration-lightbox-backdrop").addEventListener("click", closeIllustrationLightbox);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && illustrationLightbox.classList.contains("open")) {
    closeIllustrationLightbox();
  }
});
