import React from "react";
import CIcon from "@coreui/icons-react";
import { cilChevronLeft, cilChevronRight } from "@coreui/icons";
import { Link, createSearchParams } from "react-router-dom";

export default function LittlePagination({ queryConfig, pageSize, path }) {
  const page = Number(queryConfig.page);

  return (
    <div className="d-flex aligm-items-center">
      <div>
        <span className="text-info">{pageSize ? page : 0}</span>
        <span>/{pageSize}</span>
      </div>
      <div className="ms-2 d-flex">
        {page === 1 || pageSize === 0 ? (
          <span className="px-3 h-2rem rounded-start bg-light d-flex align-items-center border shadow-sm">
            <CIcon icon={cilChevronLeft} />
          </span>
        ) : (
          <Link
            to={{
              pathname: path,
              search: createSearchParams({
                ...queryConfig,
                page: (page - 1).toString(),
              }).toString(),
            }}
            className="px-3 h-2rem rounded-start bg-white text-black d-flex align-items-center border shadow-sm"
          >
            <CIcon icon={cilChevronLeft} />
          </Link>
        )}
        {page === pageSize || pageSize === 0 ? (
          <span className="px-3 h-2rem rounded-end bg-light d-flex align-items-center border shadow-sm">
            <CIcon icon={cilChevronRight} />
          </span>
        ) : (
          <Link
            to={{
              pathname: path,
              search: createSearchParams({
                ...queryConfig,
                page: (page + 1).toString(),
              }).toString(),
            }}
            className="px-3 h-2rem rounded-end bg-white text-black d-flex align-items-center border shadow-sm"
          >
            <CIcon icon={cilChevronRight} />
          </Link>
        )}
      </div>
    </div>
  );
}
