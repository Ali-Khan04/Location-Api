const btn = document.getElementById("call_button");
const locationDisplay = document.getElementById("display_window");
const cityImage = document.getElementById("city_image");

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
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const url =
        "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
        latitude +
        "&lon=" +
        longitude;

      return fetch(url);
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("API response not OK: " + response.statusText);
      }
      return response.json();
    })
    .then(function (data) {
      if (data.address) {
        const location =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.country ||
          "Unknown location";
        locationDisplay.textContent = "Location: " + location;
      } else {
        locationDisplay.textContent = "No location data found.";
      }
      locationDisplay.style.opacity = 1;

      if (location !== "Unknown location") {
        const imageUrl = `https://pixabay.com/api/?key=45865263-dd1f8d1c8ea5fcaf9e34ef855&q=${encodeURIComponent(
          location
        )}&image_type=photo`;

        cityImage.src = imageUrl;
        cityImage.alt = "Image of " + location;
        cityImage.style.display = "block";
      }
    });
});
