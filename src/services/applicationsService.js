const API_Url = import.meta.env.VITE_BASE_URL;

const getAuthHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const applicationsService = {
  async getApplications(userUid) {
    const params = new URLSearchParams({ UserUid: userUid });
    const response = await fetch(`${API_Url}/api/applications?${params}`, {
      headers: getAuthHeader(),
    });

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
      throw new Error(
        `Failed to create application: ${JSON.stringify(error)}\n ${app}`,
      );
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

  async deleteApplication(id, userUid) {
    const params = new URLSearchParams({ UserUid: userUid });
    const response = await fetch(
      `${API_Url}/api/applications/${id}?${params}`,
      {
        method: "DELETE",
        headers: getAuthHeader(),
      },
    );

    if (!response.ok) throw new Error("Failed to delete application!");
    return response.status === 204 ? null : response.json();
  },
};
