import { headers } from "../../utils/Utils";

export const loginUser = async (data: number): Promise<Response> => {
  return await fetch(`${process.env.REACT_APP_SERVER_URI}/auth/login`, {
    method: "POST",
    headers: headers
  });
};
