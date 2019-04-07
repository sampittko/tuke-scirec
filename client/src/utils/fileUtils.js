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

export const asyncForEach = async (array, callbackFn) => {
  for (let i = 0; i < array.length; i++) {
    await callbackFn(array[i]);
  }
};