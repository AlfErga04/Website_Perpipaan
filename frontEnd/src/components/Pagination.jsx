import React from "react";

const Pagination = ({
  totalData,
  postPerData,
  classAdd,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  // Push total post divided by post per page
  for (let i = 1; i <= Math.ceil(totalData / postPerData); i++) {
    pages.push(i);
  }

  return (
    <div className={classAdd}>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`${
              currentPage == page ? "bg-[#F66951]" : "bg-[#090909]"
            } border border-white rounded-lg inline-flex items-center justify-center py-1 px-4 text-center font-light text-white hover:bg-[#f48a78] hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 text-sm`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
