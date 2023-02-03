import CustomButton from '../CustomButton';
import styles from './index.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomIconButton from '../CustomIconButton';
import Chip from '@mui/material/Chip';

interface PropTypes {
  total: number;
  showPerPage: number;
  currentPage: number;
  setCurrentPage: Function;
}

const CustomPagination = ({
  total,
  showPerPage,
  currentPage,
  setCurrentPage,
}: PropTypes) => {
  const OFFSET_LIMIT_PAGINATION = 3;
  const possiblePages = total / showPerPage;
  const pages = [];
  for (var i = 0; i < possiblePages; i++) {
    pages.push(i + 1);
  }
  const goNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const goBack = () => {
    setCurrentPage(currentPage - 1);
  };
  const goAtPage = (page: number) => {
    setCurrentPage(page);
  };

  const isLeftSeprator = currentPage - OFFSET_LIMIT_PAGINATION > 0;
  const isrightSeprator = currentPage + OFFSET_LIMIT_PAGINATION < possiblePages;

  const renderPage = (page: number) => {
    if (
      (page == 2 && isLeftSeprator) ||
      (page == possiblePages - 1 && isrightSeprator)
    ) {
      return <p>...</p>;
    } else if (
      page == 1 ||
      page == possiblePages ||
      (currentPage - OFFSET_LIMIT_PAGINATION < page &&
        currentPage + OFFSET_LIMIT_PAGINATION > page)
    ) {
      return (
        <Chip
          label={page}
          onClick={() => goAtPage(page)}
          variant={page === currentPage ? 'filled' : 'outlined'}
          color='success'
        />
      );
    } else {
      return <></>;
    }
  };
  return (
    <div className={styles.pagination}>
      <CustomButton
        handleClick={goBack}
        label='Previous'
        variant='outlined'
        disabled={currentPage <= 1}
        prependIcon={<ArrowBackIcon />}
      />
      <div className={styles.childPages}>
        {pages.map((page) => {
          return renderPage(page);
        })}
      </div>

      <CustomButton
        handleClick={goNext}
        label='Next'
        variant='outlined'
        disabled={currentPage >= possiblePages}
        appendIcon={<ArrowForwardIcon />}
      />
    </div>
  );
};

export default CustomPagination;
