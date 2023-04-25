import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".js-gallery");
const markup = galleryItems
    .map(
        ({ preview, original, description }) =>
            `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`
    )
    .join("");

gallery.insertAdjacentHTML("beforeend", markup);
gallery.addEventListener("click", onClick);

function onClick(evt) {
    evt.preventDefault();

    const { target } = evt;
    if (!target.closest(".gallery__item")) {
        return;
    }

    const originalImage = target.dataset.source;
    const currentImage = galleryItems.find(
        ({ original }) => original === originalImage
    );

    const instance = basicLightbox.create(
        `<img src="${currentImage.original}" alt="${currentImage.description}">`,
        {
            onClose: () => {
                document.removeEventListener("keydown", escapeModal);
            },
        }
    );
    instance.show();

    if (instance.visible()) {
        document.addEventListener("keydown", escapeModal);
    }

    function escapeModal(evt) {
        if (evt.key === "Escape") {
            instance.close();
        }
    }
}
