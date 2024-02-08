const swiper = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 4,
  slidesPerGroup: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const modal = document.getElementById("modal");
const videoPlayer = document.getElementById("videoPlayer");
const closeBtn = modal.querySelector(".close");
const swiperSlides = document.querySelectorAll(".swiper-slide");
const paginationBullets = document.querySelectorAll(
  ".swiper-pagination-bullet"
);

async function openModalWithVideo(videoUrl) {
  videoPlayer.innerHTML = videoUrl;
  modal.style.display = "block";

  const videoIframe = videoPlayer.querySelector("iframe");
  const src = videoIframe.getAttribute("src");
  videoIframe.setAttribute("src", src + "&autoplay=1");

  closeBtn.addEventListener("click", closeModal);
}

swiperSlides.forEach((slide, index) => {
  slide.addEventListener("click", async () => {
    const { videoUrl } = await getVideos();
    openModalWithVideo(videoUrl);
    swiper.slideTo(index);
  });
});

paginationBullets.forEach((bullet, index) => {
  bullet.addEventListener("click", async () => {
    const { videoUrl } = await getVideos();
    openModalWithVideo(videoUrl);
    swiper.slideTo(index);
  });
});

function closeModal() {
  modal.style.display = "none";
  const videoIframe = videoPlayer.querySelector("iframe");
  videoIframe.src = "";
  videoIframe.setAttribute("autoplay", "0");
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Esc") {
    closeModal();
  }
});
