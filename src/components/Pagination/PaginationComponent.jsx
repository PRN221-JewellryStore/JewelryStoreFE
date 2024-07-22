import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export const PaginationComponent = ({ totalPage, pageIndex, onPageChange }) => {
  const listPageItems = [];
  for (let i = 1; i <= totalPage; i++) {
    listPageItems.push(
      <PaginationItem key={i} active={i === pageIndex} className="inline-block">
        <PaginationLink
          onClick={() => {
            onPageChange(i);
          }}
          className={`px-4 py-2 border ${i === pageIndex ? 'bg-blue-500 text-white' : ''}`}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }
  if (totalPage <= 1) {
    return null;
  } else {
    return (
      <Pagination className="flex justify-center items-center space-x-2 my-4">
        <PaginationItem className="inline-block">
          <PaginationLink
            first
            onClick={() => {
              onPageChange(1);
            }}
            className="px-4 py-2 border"
          />
        </PaginationItem>
        <PaginationItem className="inline-block">
          <PaginationLink
            onClick={() => {
              if (pageIndex > 1) {
                onPageChange(pageIndex - 1);
              }
            }}
            previous
            className="px-4 py-2 border"
          />
        </PaginationItem>
        {listPageItems}
        <PaginationItem className="inline-block">
          <PaginationLink
            onClick={() => {
              if (pageIndex < totalPage) {
                onPageChange(pageIndex + 1);
              }
            }}
            next
            className="px-4 py-2 border"
          />
        </PaginationItem>
        <PaginationItem className="inline-block">
          <PaginationLink
            onClick={() => {
              onPageChange(totalPage);
            }}
            last
            className="px-4 py-2 border"
          />
        </PaginationItem>
      </Pagination>
    );
  }
};
