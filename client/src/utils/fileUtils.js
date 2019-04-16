export const convertBtoMB = bytes => {
  return Math.round((bytes / 1000000) * 1000) / 1000;
};

export const countFilesSize = files => {
  let bytes = 0;
  files.forEach(file => {
    bytes += file.size;
  });
  return convertBtoMB(bytes);
};

export const saveFile = (function () {
  let a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (blob, fileName) {
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());