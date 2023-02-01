import CustomButton from '../CustomButton';
import CustomIconButton from '../CustomIconButton';
import styles from './index.module.scss';

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
  const possiblePages = total / showPerPage;
  const pages = [];
  for (var i = 1; i <= possiblePages; i++) {
    pages.push(i);
  }

  const goNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const goBack = () => {
    setCurrentPage(currentPage - 1);
  };
  const goThisPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.pagination}>
      <CustomButton
        handleClick={goBack}
        label='Previous'
        variant='outlined'
        disabled={currentPage <= 1}
      />

      {pages.map((page) => {
        return (
          <CustomButton
            handleClick={() => goThisPage(page)}
            key={page}
            label={page as unknown as string}
            variant={page === currentPage ? 'contained' : 'outlined'}
          />
        );
      })}
      <CustomButton
        handleClick={goNext}
        label='Next'
        variant='outlined'
        disabled={currentPage >= possiblePages}
      />
    </div>
  );
};

export default CustomPagination;
