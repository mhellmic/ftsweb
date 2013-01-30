function handleFileSelect(evt) {
  var f = evt.target.files[0];
  if (f) {
    var xhr = new XMLHttpRequest();
    var fd = f;
    xhr.open("POST", "upload/"+fd.name);
    xhr.send(fd);
  }
}
