import React from 'react';

type PropertyGoodsListProps = {
  goods: string[];
}

function PropertyGoodsList({goods}: PropertyGoodsListProps): JSX.Element {
  return(
    <ul className="property__inside-list">
      {goods.map((item) => (
        <li key={item} className="property__inside-item">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default PropertyGoodsList;
