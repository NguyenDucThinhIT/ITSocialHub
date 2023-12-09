import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";

import useQueryParams from "./useQueryParams";

export default function useQueryConfigJob() {
  const queryParams = useQueryParams();
  const queryConfig = omitBy(
    {
      page: queryParams.page || "1",
      size: queryParams.size || "9",
      sortBy: queryParams.sortBy,
      sortOrder: queryParams.sortOrder,
      keyword: queryParams.keyword,
      location: queryParams.location,
    },
    isUndefined
  );
  return queryConfig;
}
