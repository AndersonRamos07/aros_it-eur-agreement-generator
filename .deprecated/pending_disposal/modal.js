//#region Trecho 004 https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal

const modal = document.querySelector(".modal");
const fHour = modal.querySelector("#formHour");
const fInfo = modal.querySelector("#formInfo");
const btn = document.getElementById("all");
const btns = document.querySelectorAll(".settings");
//const span = document.getElementsByClassName("close")[0];
/*
btns.forEach(
    btn => {
        alert("veio")
        btn.onclick = () =>
        {
            if(btn.classList.contains("hour"))
            {
                fInfo.style.display = "none";
            }
            if(btn.classList.contains("info"))
            {
                fHour.style.display = "none";
            }
            modal.style.display = "block";
        }
    }
)
*/
btn.onclick = function () {
  modal.style.display = "block";
}
/*
span.onclick = function() {
  modal.style.display = "none";
}
*/
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//#endregion
