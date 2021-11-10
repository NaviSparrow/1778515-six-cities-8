import React from 'react';

type PropertyPhotosProps = {
  images: string[];
}

function PropertyPhotos({images}: PropertyPhotosProps): JSX.Element {
  return (
    <React.Fragment>
      {images.map((image) => (
        <div key={image} className="property__image-wrapper">
          <img className="property__image" src={image} alt="Photo studio"/>
        </div>
      ),
      )}
    </React.Fragment>
  );
}
export default React.memo(PropertyPhotos);
