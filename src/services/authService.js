const API_Url = import.meta.env.VITE_BASE_URL;

export const authService = {
  async register(email, password) {
    const response = await fetch(`${API_Url}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("userUid", data.userUid);
    return data;
  },

  async login(email, password) {
    const response = await fetch(`${API_Url}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("userUid", data.userUid);
    return data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userUid");
    localStorage.removeItem("cachedApps");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  getUserUid() {
    return localStorage.getItem("userUid");
  },
};
