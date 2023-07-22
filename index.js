const parse = (data) => JSON.parse(data);

function requestData(method, URL, cb) {
  const xml = new XMLHttpRequest();
  xml.open(method, URL);
  xml.send();

  xml.addEventListener('readystatechange', () => {
    if (xml.readyState === 4 && xml.status < 400) {
      const response = parse(xml.responseText);
      cb(response);
    }
  });
}

function joinJsonFiles(file1, file2) {
  const combinedObjects = file1.children.concat(file2.children);
  return combinedObjects;
}

requestData('GET', 'jsonFiles/data.json', (file1) => {
  requestData('GET', 'jsonFiles/data2.json', (file2) => {
    const result = joinJsonFiles(file1, file2);
    console.log(result);
  })
});
