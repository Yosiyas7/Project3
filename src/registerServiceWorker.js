const isLocalhost = Boolean(
  // Check if the hostname is 'localhost'
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // Create a new URL object with the public URL and the current window location
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    // Check if the origin of the public URL is different from the current window location
    if (publicUrl.origin !== window.location.origin) {
      // If the origins are different, return without registering the service worker
      return;
    }

    // Add an event listener for the 'load' event to register the service worker
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // If running on localhost, check the validity of the service worker
        checkValidServiceWorker(swUrl);

        // Display a message in the console once the service worker is ready
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        // If not running on localhost, register the service worker
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  // Register the service worker
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      // Listen for updates to the service worker
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // If there is an existing service worker, display a message to refresh the page
              console.log('New content is available; please refresh.');
            } else {
              // If there is no existing service worker, display a message for offline use
              console.log('Content is cached for offline use.');
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker file exists and is valid
  fetch(swUrl)
    .then(response => {
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // If the service worker file is not found or not a JavaScript file,
        // unregister the service worker and reload the page
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // If the service worker file is valid, register the service worker
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      // If there is no internet connection, run the app in offline mode
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  // Unregister the service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
