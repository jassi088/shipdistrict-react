import { ChevronLeft, ChevronRight } from 'lucide-react';
import cn from '@/utils/cn';
import { Typography } from '@/components/common/typography';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface PaginationProps {
  pageNo: number;
  pageSize: number;
  totalRecords: number;
  setPageNumber: (page: number) => void;
  setPageSize: (size: number) => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNo,
  pageSize,
  setPageNumber,
  setPageSize,
  totalRecords,
  isNextDisabled,
  isPrevDisabled,
}) => {
  const pageSizes = [10, 25, 50, 100];
  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <div
      className={cn(
        'bg-white w-full items-center justify-center gap-x-4 py-2 box-shadow',
        totalPages === 0 ? 'hidden' : 'flex',
      )}
    >
      <div className="flex items-center gap-x-2">
        <Button size="icon" onClick={() => setPageNumber(pageNo - 1)} disabled={isPrevDisabled}>
          <ChevronLeft className="size-4" />
        </Button>
        <Typography variant="body-small" className="font-medium">
          {pageNo} of {totalPages}
        </Typography>
        <Button size="icon" onClick={() => setPageNumber(pageNo + 1)} disabled={isNextDisabled}>
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-x-2">
        <Typography variant="small">Items per page</Typography>
        <Select
          defaultValue={pageSize.toString()}
          onValueChange={(value) => setPageSize(Number(value))}
          disabled={pageNo === 1 && totalRecords === 0}
        >
          <SelectTrigger className="font-medium max-w-max h-6 bg-primary text-white border-none">
            <SelectValue placeholder="Page Size" />
          </SelectTrigger>
          <SelectContent className="w-auto">
            {pageSizes.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Pagination;
