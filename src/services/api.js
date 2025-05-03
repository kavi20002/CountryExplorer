const API_BASE = "https://restcountries.com/v3.1";

export const fetchAllCountries = async () => {
  try {
    const response = await fetch(`${API_BASE}/all`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
}

export const fetchCountryByCode = async (code) => {
  try {
    const response = await fetch(`${API_BASE}/alpha/${code}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching country by code:", error);
    throw error;
  }
}