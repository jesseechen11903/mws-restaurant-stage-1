/* offline notification handler */
// window.addEventListener('load', () => {
//     function handleNetworkChange(event) {
//         let modal = document.getElementById('notification');

//         if (navigator.onLine) {
//             modal.style.display = 'none';
//         } else {
//             modal.style.display = 'block';
//         }
//     }

//     window.addEventListener('online', handleNetworkChange);
//     window.addEventListener('offline', handleNetworkChange);
// });

// When the user clicks anywhere outside of the modal, close it

document.getElementById('notification').onclick = function(event) {
    if (event.target.tagName == 'A') {
        document.getElementById('notification').style.display = "none";
    }
}
