import React from "react";
import { useTranslation } from "react-i18next";
import { Link, createSearchParams } from "react-router-dom";

const RANGE = 2;

export default function Pagination({ queryConfig, pageSize, path }) {
  const page = Number(queryConfig.page);
  const { t } = useTranslation("common");

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={index}
            className="bg-white rounded px-3 py-2 mx-2 shadow-sm border"
          >
            ...
          </span>
        );
      }
      return null;
    };
    const renderDotAfter = (index) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            key={index}
            className="bg-white rounded px-3 py-2 mx-2 shadow-sm border "
          >
            ...
          </span>
        );
      }
      return null;
    };
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }

        return (
          <Link
            to={{
              pathname: path,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString(),
              }).toString(),
            }}
            key={index}
            className={
              pageNumber === page
                ? "text-decoration-none text-white bg-primary rounded px-3 py-2 mx-2 shadow-sm border border-2 border-primary"
                : "text-decoration-none text-primary bg-white rounded px-3 py-2 mx-2 shadow-sm border"
            }
          >
            {pageNumber}
          </Link>
        );
      });
  };
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {page === 1 || pageSize === 0 ? (
        <span className="bg-white text-muted rounded px-3 py-2 mx-2 shadow-sm border">
          {t("jobPage.prev")}
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
          className="text-decoration-none text-primary bg-white rounded px-3 py-2 mx-2 shadow-sm border"
        >
          {t("jobPage.prev")}
        </Link>
      )}
      {renderPagination()}
      {page === pageSize || pageSize === 0 ? (
        <span className="bg-white text-muted rounded px-3 py-2 mx-2 shadow-sm border">
          {t("jobPage.next")}
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
          className="text-decoration-none text-primary bg-white rounded px-3 py-2 mx-2 shadow-sm border"
        >
          {t("jobPage.next")}
        </Link>
      )}
    </div>
  );
}
