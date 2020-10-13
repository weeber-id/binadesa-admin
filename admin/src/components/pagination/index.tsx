import React from 'react';

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
  isDisabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  maxPage,
  currentPage,
  setCurrentPage,
  className,
  isDisabled,
}) => {
  const elements = [];
  const paginationClassName = ['pagination'];

  if (className) paginationClassName.push(className);

  for (let i = currentPage; i <= maxPage; i++) {
    const className = ['pagination__number'];
    if (i === currentPage) className.push('active');
    elements.push(
      <span
        key={`pagination-${i}`}
        onClick={() => {
          if (!isDisabled) setCurrentPage(i);
        }}
        className={className.join(' ')}
      >
        {i}
      </span>
    );
  }

  if (currentPage > 1) {
    for (let i = currentPage - 1; i > currentPage - 5; i--) {
      if (i > 0)
        elements.unshift(
          <span
            key={`pagination-${i}`}
            onClick={() => {
              if (!isDisabled) setCurrentPage(i);
            }}
            className="pagination__number"
          >
            {i}
          </span>
        );
    }
  }

  while (elements.length > 10) {
    elements.pop();
  }

  if (elements.length < 10) {
    if (maxPage >= 10) {
      for (let i = currentPage - 5; elements.length < 10; i--) {
        if (i > 0)
          elements.unshift(
            <span
              key={`pagination-${i}`}
              onClick={() => {
                if (!isDisabled) setCurrentPage(i);
              }}
              className="pagination__number"
            >
              {i}
            </span>
          );
      }
    } else {
      for (let i = currentPage - 5; elements.length < maxPage; i--) {
        if (i > 0)
          elements.unshift(
            <span
              key={`pagination-${i}`}
              onClick={() => {
                if (!isDisabled) setCurrentPage(i);
              }}
              className="pagination__number"
            >
              {i}
            </span>
          );
      }
    }
  }

  const onNext = (i: number) => {
    if (i <= maxPage && !isDisabled) setCurrentPage(i);
  };

  const onPrev = (i: number) => {
    if (i > 0 && !isDisabled) setCurrentPage(i);
  };

  return (
    <div className={paginationClassName.join(' ')}>
      <div onClick={() => onPrev(currentPage - 1)} className="pagination__prev">
        Prev
      </div>
      <div className="pagination__numbers">{elements}</div>
      <div onClick={() => onNext(currentPage + 1)} className="pagination__next">
        Next
      </div>
    </div>
  );
};

export default Pagination;
