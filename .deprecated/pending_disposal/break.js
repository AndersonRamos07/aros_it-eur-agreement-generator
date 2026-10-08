//#region Trecho 003
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

const imgs = document.querySelector("#imgs");

imgs.addEventListener("change", (event) => {
  imgs.checked? imagesVisibility (0):
    imagesVisibility (1);
});
//#endregion Trecho 003

function imagesVisibility (pStatus)
{
    let images = document.querySelectorAll(".images");
    images.forEach(image => image.style.opacity = pStatus)
}
imagesVisibility()

//#region Trecho 002
//https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter") {
        toggleFullScreen();
      }
    },
    false
  );

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
//#endregion Trecho 002