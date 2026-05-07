import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000",
  timeout: 15000,
});

export const analyzeMood = async (text) => {
  const { data } = await api.post("/analyze", { text });
  return data;
};

export const fetchEntries = async () => {
  const { data } = await api.get("/entries");
  return data;
};

export const fetchDatabaseView = async () => {
  const { data } = await api.get("/database");
  return data;
};
