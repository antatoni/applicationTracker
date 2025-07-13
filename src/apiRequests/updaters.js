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
