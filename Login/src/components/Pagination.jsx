import React from 'react';

import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  maxPagesToShow = 5 
}) => {
  // คำนวณว่าควรแสดงปุ่มหน้าไหนบ้าง
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // ปรับ startPage ถ้า endPage ชนขอบ
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
      {/* ปุ่ม Previous */}
      <button
        className="btn px-3 py-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          backgroundColor: currentPage === 1 ? '#E5E7EB' : '#748D8C',
          color: currentPage === 1 ? '#9CA3AF' : 'white',
          borderRadius: '8px',
          border: 'none'
        }}
      >
        <span className=" d-flex align-items-center"><GrFormPrevious className='me-1'/>Previous</span>
      </button>

      {/* แสดงปุ่มหน้าแรกและ ... ถ้าจำเป็น */}
      {getPageNumbers()[0] > 1 && (
        <>
          <button
            className="btn px-3 py-2"
            onClick={() => onPageChange(1)}
            style={{
              backgroundColor: currentPage === 1 ? '#473366' : '#F3F4F6',
              color: currentPage === 1 ? 'white' : '#473366',
              borderRadius: '8px',
              border: 'none'
            }}
          >
            1
          </button>
          {getPageNumbers()[0] > 2 && <span>...</span>}
        </>
      )}

      {/* แสดงปุ่มหน้าต่างๆ */}
      {getPageNumbers().map(pageNum => (
        <button
          key={pageNum}
          className="btn px-3 py-2"
          onClick={() => onPageChange(pageNum)}
          style={{
            backgroundColor: currentPage === pageNum ? '#473366' : '#F3F4F6',
            color: currentPage === pageNum ? 'white' : '#473366',
            borderRadius: '8px',
            border: 'none'
          }}
        >
          {pageNum}
        </button>
      ))}

      {/* แสดงปุ่มหน้าสุดท้ายและ ... ถ้าจำเป็น */}
      {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
        <>
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && <span>...</span>}
          <button
            className="btn px-3 py-2"
            onClick={() => onPageChange(totalPages)}
            style={{
              backgroundColor: currentPage === totalPages ? '#473366' : '#F3F4F6',
              color: currentPage === totalPages ? 'white' : '#473366',
              borderRadius: '8px',
              border: 'none'
            }}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* ปุ่ม Next */}
      <button
        className="btn px-3 py-2 "
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          backgroundColor: currentPage === totalPages ? '#E5E7EB' : '#748D8C',
          color: currentPage === totalPages ? '#9CA3AF' : 'white',
          borderRadius: '8px',
          border: 'none'
        }}
      >
        <span className=" d-flex align-items-center">Next<GrFormNext className='me-1'/></span>
      </button>
    </div>
  );
};

export default Pagination;