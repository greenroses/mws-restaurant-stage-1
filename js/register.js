/*set up service worker*/
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
  .register("/sw.js")
  .then (reg => {
    console.log("Serviceworker registration successful: " + reg.scope);
  })
  .catch(error =>{
    console.log("Registration filed: " + error);
  });
}
