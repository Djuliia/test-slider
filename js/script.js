const mySwiper = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 4,
  // spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

async function openModalWithVideo(videoUrl) {
  const modalContent = document.getElementById("videoPlayer");
  modalContent.innerHTML = videoUrl;
  document.getElementById("modal").style.display = "block";

  const videoIframe = modalContent.querySelector("iframe");
  videoIframe.src += "&autoplay=1";
}

document.querySelectorAll(".swiper-slide").forEach((slide) => {
  slide.addEventListener("click", async () => {
    const { videoUrl } = await getVideos();
    openModalWithVideo(videoUrl);
  });
});

function closeModal() {
  document.getElementById("modal").style.display = "none";
  const videoIframe = document
    .getElementById("videoPlayer")
    .querySelector("iframe");
  videoIframe.src = "";
  videoIframe.setAttribute("autoplay", "0");
}
document.querySelector(".close").addEventListener("click", () => {
  closeModal();
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Esc") {
    closeModal();
  }
});
