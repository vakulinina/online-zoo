const streamList = document.querySelector('.broadcast__stream-list');
const selectedStream = document.querySelector('.broadcast__main-stream');
const previewList = document.querySelectorAll('.broadcast__stream-preview');

const urlStore = {
  1: previewList.item(0).src,
  2: previewList.item(1).src,
  3: previewList.item(2).src,
}
const streamHandler = ({ target }) => {
  console.log(target);

  const streamWidth = 0.31; // in percent
  const width = target.offsetWidth;
  if (event.offsetX < streamWidth * width) {
    let buffer = selectedStream.src;
    selectedStream.src = urlStore['1'];
    previewList.item(0).src = buffer;
    urlStore['1'] = buffer;
  } else if (event.offsetX > width - streamWidth * width) {
    let buffer = selectedStream.src;
    selectedStream.src = urlStore['3'];
    previewList.item(2).src = buffer;
    urlStore['3'] = buffer;
  } else {
    let buffer = selectedStream.src;
    selectedStream.src = urlStore['2'];
    previewList.item(1).src = buffer;
    urlStore['2'] = buffer;
  }
}


streamList.addEventListener('click', streamHandler);
