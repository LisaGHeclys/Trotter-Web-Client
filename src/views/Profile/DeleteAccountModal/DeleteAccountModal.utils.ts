import { headers } from "../../../utils/Utils";

export const deleteUser = async (id: string): Promise<Response> => {
  return await fetch(`${process.env.REACT_APP_SERVER_URI}/user/${id}`, {
    method: "DELETE",
    headers: headers
  });
};
