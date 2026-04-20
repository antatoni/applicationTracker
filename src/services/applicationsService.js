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

  async createApplication(app) {\n    // Ensure appliedOn is a valid ISO 8601 datetime\n    const payload = {\n      ...app,\n      appliedOn: app.appliedOn ? new Date(app.appliedOn).toISOString() : new Date().toISOString(),\n    };\n    const response = await fetch(`${API_Url}/api/applications`, {\n      method: "POST",\n      headers: getAuthHeader(),\n      body: JSON.stringify(payload),\n    });
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
