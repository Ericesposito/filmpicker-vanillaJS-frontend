document.addEventListener('DOMContentLoaded', (e) => {
  console.log('Document is fully loaded and parsed');
  document.addEventListener('click', (e) => {
    console.log('page clicked');
  });
});
