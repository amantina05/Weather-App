// get the longitude & latitude from our location
  //after our page loads were going to get the location
    //after this pages load this function runs & everything inside runs
window.addEventListener('load', () => {
  //defining coordinates
  let long;
  let lat;
  //pulls from html file
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');

  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');
    //if they exsist in the browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      //gives you the positions and the long & lat
      //console.log(position)
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/'
      //this is the api from the website
      const api = `${proxy}https://api.darksky.net/forecast/cffcf129877c8679285ebc1738547dc4/${lat},${long}`;

      //get request getting information from the url
      fetch(api)
      //after you got the information then i can do something with this data
        .then(response => {
        //take this info and convert to json
          return response.json();
      })
        .then(data => {
          //console.log(data);
          //accessing data.currently & pull out all the information from currently with brackets
          const {temperature, summary, icon} = data.currently;
          //rather than doing each time you want something
          //data.currently.temperature

          //Set DOM Elements from the API
          //pulls out temp from api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
            //formula for celsius
            let celsius = (temperature - 32) * (5 / 9);
            //set icon (invoke the function)
            setIcon(icon, document.querySelector('.icon'));

            //change temp to celsius or farh
            temperatureSection.addEventListener('click', () => {
              if (temperatureSpan.textContent === 'F') {
                temperatureSpan.textContent = 'C';
                temperatureDegree.textContent = Math.floor(celsius)
              } else {
                temperatureSpan.textContent = 'F';
                temperatureDegree.textContent = temperature;
              }
            })
        });
    });
  }
  // } else {
  //   h2.textContent = 'hey please enable your gelocation'
  // }

  //create a function that setIcons

  function setIcon(icon, iconID){
    //access the lib, initalize a new lib?
    const skycons = new Skycons({color: 'white'});
    //look for every line and replaces it with the underscore && make everything uppercase
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    //for animation
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);

  }
});
