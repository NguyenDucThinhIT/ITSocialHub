import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";

import useQueryParams from "./useQueryParams";

export default function useQueryConfigAcc() {
  const queryParams = useQueryParams();
  const queryConfig = omitBy(
    {
      page: queryParams.page || "1",
      size: queryParams.size || "10",
      role: queryParams.role,
      username: queryParams.username,
    },
    isUndefined
  );
  return queryConfig;
}
