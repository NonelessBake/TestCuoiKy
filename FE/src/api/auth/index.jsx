import axiosInstance from "../axios";

export const apiAuth = {
  login: async (payloadLogin) => {
    try {
      const { data } = await axiosInstance.post("/users/login", payloadLogin);
      if (data) {
        return data;
      } else {
        throw new Error("missing data");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
  renewAccessToken: async (payloadToken) => {
    try {
      const { data } = await axiosInstance.post(
        "/authentication",
        {},
        { headers: { Authorization: `Bearer ${payloadToken}` } }
      );
      if (data) {
        return data;
      } else {
        throw new Error("Token fail");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
