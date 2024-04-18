import axios from "axios";
import { APP_CONFIG } from "../../config/appConfig";
import { isIntegerGreaterThanOne } from "../../utils/checkParams";
import { Navigate } from "react-router-dom";
export const movieService = {
  getMovies: async (page) => {
    const pageSize = APP_CONFIG.LIMIT_MOVIES_PER_PAGE;
    if (!page) page = 1;
    const isValidPage = isIntegerGreaterThanOne(page);
    if (isValidPage === false) return <Navigate to="/home" replace="true" />;

    const { data } = await axios.get(`${APP_CONFIG.BASE_URL}/movies?`, {
      params: {
        page: page,
        pageSize: pageSize,
      },
    });
    if (!data) throw new Error("Data is broken");
    else {
      return data.data;
    }
  },
};
