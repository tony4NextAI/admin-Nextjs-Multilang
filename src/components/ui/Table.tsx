import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Select } from './Select';

interface TableProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'striped' | 'bordered';
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
  sortable?: boolean;
  onSort?: () => void;
  sortDirection?: 'asc' | 'desc' | null;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

// Enhanced DataTable interfaces
interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  className?: string;
  itemsPerPage?: number;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  onPageSizeChange?: (pageSize: number) => void;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
}

const tableVariants = {
  default: 'border-collapse border-0',
  striped: 'border-collapse border-0',
  bordered: 'border-collapse border border-gray-200'
};

export const Table: React.FC<TableProps> = ({ 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={cn(
        'min-w-full table-auto',
        tableVariants[variant],
        className
      )}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<TableHeaderProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <thead className={cn('bg-indigo-600', className)}>
      {children}
    </thead>
  );
};

export const TableBody: React.FC<TableBodyProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <tbody className={cn('bg-white divide-y divide-gray-200', className)}>
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<TableRowProps> = ({ 
  children, 
  className = '',
  onClick
}) => {
  return (
    <tr 
      className={cn(
        'transition-colors duration-200',
        onClick && 'cursor-pointer hover:bg-gray-50',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export const TableHead: React.FC<TableHeadProps> = ({ 
  children, 
  className = '',
  sortable = false,
  onSort,
  sortDirection = null
}) => {
  const getSortIcon = () => {
    if (!sortable) return null;
    
    if (sortDirection === 'asc') {
      return (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    if (sortDirection === 'desc') {
      return (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
    
    return (
      <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  };

  return (
    <th className={cn(
      'px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-white/20',
      sortable && 'cursor-pointer hover:bg-indigo-700 select-none transition-colors duration-200',
      className
    )}
    onClick={sortable ? onSort : undefined}
    >
      <div className="flex items-center space-x-2">
        <span className="drop-shadow-sm">{children}</span>
        {getSortIcon()}
      </div>
    </th>
  );
};

export const TableCell: React.FC<TableCellProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <td className={cn(
      'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
      className
    )}>
      {children}
    </td>
  );
};

/**
 * Enhanced Pagination Component with UI Kit Integration
 * 
 * Features:
 * - Responsive design (mobile/desktop layouts)
 * - Page size selector with customizable options
 * - Professional styling with hover effects
 * - Accessibility support
 * - Integration with UI Kit Button and Select components
 * 
 * @param currentPage - Current active page number
 * @param totalPages - Total number of pages
 * @param onPageChange - Callback when page changes
 * @param itemsPerPage - Number of items per page
 * @param totalItems - Total number of items
 * @param onPageSizeChange - Optional callback when page size changes
 * @param showPageSizeSelector - Whether to show page size selector
 * @param pageSizeOptions - Available page size options
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  onPageSizeChange,
  showPageSizeSelector = false,
  pageSizeOptions = [5, 10, 20, 50]
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200 relative">
      {/* Mobile pagination */}
      <div className="flex justify-between flex-1 sm:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2"
        >
          Next
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
      
      {/* Desktop pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-700">
            Showing <span className="font-semibold text-gray-900">{startItem}</span> to{' '}
            <span className="font-semibold text-gray-900">{endItem}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalItems}</span> results
          </p>
          
          {showPageSizeSelector && onPageSizeChange && (
            <div className="flex items-center gap-2 relative">
              <span className="text-sm text-gray-700">Show:</span>
              <div className="relative z-[100]">
                <Select
                  options={pageSizeOptions.map(size => ({
                    value: size.toString(),
                    label: size.toString()
                  }))}
                  value={itemsPerPage.toString()}
                  onChange={(value) => onPageSizeChange(parseInt(value))}
                  className="w-20"
                />
              </div>
              <span className="text-sm text-gray-700">per page</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="flex items-center justify-center w-10 h-10 text-sm text-gray-500">
                    ...
                  </span>
                ) : (
                  <Button
                    variant={currentPage === page ? "primary" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(page as number)}
                    className={cn(
                      "w-10 h-10 p-0 text-sm font-medium transition-all duration-200",
                      currentPage === page 
                        ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-sm" 
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-400"
                    )}
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3"
          >
            Next
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Enhanced DataTable Component
export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
  className = '',
  itemsPerPage = 10,
  showPageSizeSelector = false,
  pageSizeOptions = [5, 10, 20, 50]
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(itemsPerPage);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / currentPageSize);
  const startIndex = (currentPage - 1) * currentPageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + currentPageSize);

  const handleSort = (key: keyof T) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setCurrentPageSize(pageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className={cn('bg-white shadow rounded-lg', className)}>
      <div className="overflow-hidden rounded-t-lg">
        <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                sortable={column.sortable}
                onSort={() => column.sortable && handleSort(column.key)}
                sortDirection={
                  sortConfig.key === column.key ? sortConfig.direction : null
                }
                className={column.className}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
            >
              {columns.map((column) => (
                <TableCell key={String(column.key)} className={column.className}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key] || '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={currentPageSize}
          totalItems={sortedData.length}
          onPageSizeChange={showPageSizeSelector ? handlePageSizeChange : undefined}
          showPageSizeSelector={showPageSizeSelector}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
} 