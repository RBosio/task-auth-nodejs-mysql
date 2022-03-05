const fileInput = document.getElementById('input-photo')
const img = document.getElementById('img-file')
const buttonImg = document.getElementById('btn-img')

if (img) {
  img.addEventListener('click', (target) => {
    fileInput.click()
  })

  fileInput.onchange = () => {
  buttonImg.click()
  }
}