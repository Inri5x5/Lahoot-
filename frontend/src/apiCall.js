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
        return response.json()
      })
      .then(body => {
        resolve(body);
      })
  })
}
export { APICall };
