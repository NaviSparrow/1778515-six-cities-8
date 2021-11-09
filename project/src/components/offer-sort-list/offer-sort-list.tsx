import React, {useState} from 'react';
import {SortType} from '../../const';

type OfferSortListProps = {
  currentSort: string;
  onChangeSort: ((sort: string) => void);
}

function OfferSortList(props: OfferSortListProps):JSX.Element {
  const {currentSort, onChangeSort} = props;

  const [isPopupShown, setPopupShown] = useState<boolean>(false);
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={() => {
          setPopupShown(!isPopupShown);
        }}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isPopupShown ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((sort) => (
          <li key={sort} className={`places__option ${currentSort === sort ? 'places__option--active' : ''}`} tabIndex={0}
            onClick={() => {
              onChangeSort(sort);
            }}
          >{sort}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default React.memo(OfferSortList, (prevProps, nextProps) => prevProps.currentSort === nextProps.currentSort);
