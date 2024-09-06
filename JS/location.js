const btn = document.getElementById("call_button");
const locationDisplay = document.getElementById("display_window");

btn.addEventListener("click", function () {
  const getPosition = new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (err) => reject(err)
      );
    } else {
      reject(new Error("Permission Denied."));
    }
  });

  getPosition
    .then(function (position) {
      const { latitude, longitude } = position.coords;
      locationDisplay.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
    })
    .catch(function (err) {
      locationDisplay.textContent = `Error: ${err.message}`;
    });
});
