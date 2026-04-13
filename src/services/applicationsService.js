const API_URL = "http://localhost:5000/api/applications";

const getAuthHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const applicationsService = {
  async getApplications(userId) {
    const response = await fetch(`${API_URL}?userId=${userId}`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to fetch applications!");
    return response.json();
  },

  async createApplication(app) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(app),
    });
    if (!response.ok) throw new Error("Failed to create application!");
    return response.json();
  },

  async updateApplication(id, update) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify(update),
    });
    if (!response.ok) throw new Error("Failed to update application!");
    return response.json();
  },

  async deleteApplication(id, userId) {
    const response = await fetch(`${API_URL}/${id}?userId=${userId}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to delete application!");
    return response.status === 204 ? null : response.json();
  },
};
