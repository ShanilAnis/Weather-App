window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimeZone = document.querySelector(".location_timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "92a8992fa1msh9cf3076eba95cb1p1c58ccjsn9866427e8004",
          "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
        },
      };

      fetch(
        `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${long}&lat=${lat}`,
        options
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
          const temp = response.data[0].temp;
          const description = response.data[0].weather.description;
          const timeZone = response.data[0].timezone;
          const icon = response.data[0].weather.icon;
          console.log(temp, description);
          //Set DOM ELements on API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimeZone.textContent = timeZone;
          setIcons(icon, document.querySelector("#icon1"));
        })
        .catch((err) => console.error(err));
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons.PARTLY_CLOUDY_NIGHT);
  }
});
