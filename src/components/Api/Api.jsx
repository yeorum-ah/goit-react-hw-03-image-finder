import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const apiKey = "38477015-061959e62709d04c081e794b4";

export const FetchImg = async (searchValue, page)  => {
    const params = new URLSearchParams({
      key: apiKey,
      q : searchValue,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      per_page: 12,
      page: page,
    });
  const response = await axios.get(`?${params}`);
      return response.data;
  
  };
