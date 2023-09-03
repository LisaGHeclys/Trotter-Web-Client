import { headers } from "../../../utils/Utils";

export const loginUser = async (
  email: string,
  pwd: string
): Promise<Response> => {
  return await fetch(`${process.env.REACT_APP_SERVER_URI}/auth/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ Email: email, Password: pwd })
  });
};
