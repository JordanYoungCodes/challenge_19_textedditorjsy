const butInstall = document.getElementById('buttonInstall');


let deferredPrompt;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('before prompt fires');
    event.preventDefault();
    deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
  });

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('User choice:', outcome);
      deferredPrompt = null;
      butInstall.classList.toggle('hidden', true);
    }
  });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed.');
    butInstall.classList.toggle('hidden', true);
  });
