const img = document.querySelector("img");
const city_p = document.getElementById("city");
const country_p = document.getElementById("country");
const condition_p = document.getElementById("weather");
const temp_c_p = document.getElementById("temp_c");
const temp_f_p = document.getElementById("temp_f");
const cloud_p = document.getElementById("cloud");
const humidity_p = document.getElementById("humidity");
const info_container = document.querySelector(".info_container");
const gif_container = document.querySelector(".gif_container");

async function get_data (location) {
  const response_weather = await fetch(`https://api.weatherapi.com/v1/current.json?key=e5539bb8df4041e086e141035241103&q=${location}`, { mode: "cors" });
  const data_weather = await response_weather.json();

  if (response_weather.status !== 200) {
    throw new Error("Invalid Search");
  }

  const condition = data_weather.current.condition.text;
  const response_gif = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=q3fdW8PY5StG8kBi2wChYkyQNwTsjIBU&s=${condition}`, { mode: "cors" });
  const data_gif = await response_gif.json();
  const gif_url = data_gif.data.images.original.url;
  
  const cloud = data_weather.current.cloud;
  const humidity = data_weather.current.humidity;
  const temp_c = data_weather.current.temp_c;
  const temp_f = data_weather.current.temp_f;

  const city = data_weather.location.name;
  const country = data_weather.location.country;

  return [gif_url, condition, cloud, humidity, temp_c, temp_f, city, country];
};

function render_data (arr) {
  const gif_url = arr[0];
  const condition = arr[1];
  const cloud = arr[2];
  const humidity = arr[3];
  const temp_c = arr[4];
  const temp_f = arr[5];
  const city = arr[6];
  const country = arr[7];

  img.src = gif_url;

  city_p.textContent = `City: ${city}`;

  country_p.textContent = `Country: ${country}`;

  condition_p.textContent = `Weather: ${condition}`;

  temp_c_p.textContent = `Temperature (Celsius): ${temp_c}`;

  temp_f_p.textContent = `Temperature (Fahrenheit): ${temp_f}`;
  
  cloud_p.textContent = `Cloud: ${cloud}`;

  humidity_p.textContent = `Humidity: ${humidity}`;
}

function hide_data () {
  info_container.classList.add("hidden");
  gif_container.classList.add("hidden");
}

function show_data () {
  info_container.classList.remove("hidden");
  gif_container.classList.remove("hidden");
}

const search_btn = document.querySelector("#search_submit");
search_btn.addEventListener("click", () => {
  const location = document.getElementById("search_city").value;
  hide_data();
  get_data(location)
    .then((data) => {
      console.log(data);
      render_data(data);
      show_data();
    }).catch((err) => {
      console.log("Error: ", err);
    });
});