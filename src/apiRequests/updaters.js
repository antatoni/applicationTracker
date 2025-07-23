import { supabase } from "../database/supabase";

export const updateStage = async (stage, application) => {
  const { error } = await supabase
    .from("applications")
    .update({ stage: stage })
    .eq("id", application.id);

  if (error) throw `Error in updating stage : ${error.message}`;
};

export const updateCompany = async (company, application) => {
  const { error } = await supabase
    .from("applications")
    .update({ company: company })
    .eq("id", application.id);

  if (error) throw `Error in updating company ${error.message}`;
};

export const updateURL = async (url, application) => {
  const { error } = await supabase
    .from("applications")
    .update({ url: url })
    .eq("id", application.id);

  if (error) throw `Error in updating URL ${error.message}`;
};

export const updateLocalStorageField = (field, value, id) => {
  const storage = localStorage.getItem("cachedApps");
  if (!storage) return; // if storage is empty exit out !

  const applications = JSON.parse(storage);

  const updatedApps = applications.map((application) => {
    if (application.id === id) {
      return { ...application, [field]: value };
    }
    return application;
  });

  localStorage.setItem("cachedApps", JSON.stringify(updatedApps));
};
