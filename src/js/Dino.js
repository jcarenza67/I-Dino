export default class Dino {
  static getDino() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://dinoipsum.com/api/?format=json&paragraphs=1&words=1`;
      request.addEventListener("loadend", function() {
        if (this.status === 200) {
          try {
            const response = JSON.parse(this.responseText);
            resolve(response[0][0]);
          } catch (error) {
            reject(Error('Invalid JSON response.'));
          }
        } else {
          reject(Error(this.statusText));
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}