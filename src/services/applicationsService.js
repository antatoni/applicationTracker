const API_Url = import.meta.env.VITE_BASE_URL;

const getAuthHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const applicationsService = {
  async getApplications(UserUid) {
    const response = await fetch(
      `${API_Url}/api/applications?UserUid=${UserUid}`,
      {
        headers: getAuthHeader(),
      },
    );
    if (!response.ok) throw new Error("Failed to fetch applications!");
    return response.json();
  },

  async createApplication(app) {
    const response = await fetch(`${API_Url}/api/applications`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(app),
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error("Failed to create application!");
    }

    return response.json();
  },

  async updateApplication(id, update) {
    const response = await fetch(`${API_Url}/api/applications/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify(update),
    });
    if (!response.ok) throw new Error("Failed to update application!");
    return response.json();
  },

  async deleteApplication(id, UserUid) {
    const response = await fetch(
      `${API_Url}/api/applications/${id}?UserUid=${UserUid}`,
      {
        method: "DELETE",
        headers: getAuthHeader(),
      },
    );
    if (!response.ok) throw new Error("Failed to delete application!");
    return response.status === 204 ? null : response.json();
  },
};
