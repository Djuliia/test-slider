const TOKEN = "2fbe4923a781a99e54920460ce0260b2";
const URL = "https://api.vimeo.com";
const videoId = "824804225";

async function getVideos() {
  try {
    const response = await axios.get(`${URL}/videos/${videoId}`, {
      params: {
        access_token: TOKEN,
      },
    });
    const videoData = response.data;
    const thumbnailUrl = videoData.pictures.base_link;
    const videoUrl = videoData.embed.html;

    return { thumbnailUrl, videoUrl };
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function markup() {
  try {
    const { thumbnailUrl } = await getVideos();
    const slides = document.querySelectorAll(".swiper-slide");
    slides.forEach((slide) => {
      const img = slide.querySelector("img");
      if (img) {
        img.src = thumbnailUrl;
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
markup();
