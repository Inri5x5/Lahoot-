import { BACKEND_PORT } from './config.json';

const backendServer = `http://localhost:${BACKEND_PORT}`;

// General API-call boilerplate function
const APICall = (requestBody, path, methodType, headersData) => {
  if (requestBody !== null) requestBody = JSON.stringify(requestBody);
  return new Promise((resolve, reject) => {
    const init = {
      method: methodType,
      headers: headersData,
      body: requestBody,
    }
    fetch(`${backendServer}${path}`, init)
      .then(response => {
        if (response.status === 200) {
          return response.json().then(resolve);
        } else if (response.status === 400) {
          return response.json().then(obj => {
            reject(obj.error);
          });
        } else {
          throw new Error(`${response.status} Error with API call`);
        }
      });
  })
}

const fileToDataUrl = (file) => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

export { APICall, fileToDataUrl };
