import {render, screen} from '@testing-library/react';
import PropertyPhotos from './property-photos';
import {image} from 'faker';

const fakeImages = new Array(6).fill(null).map(() => image.image());

describe('Component: PropertyPhotos',() => {
  it('should render correctly',() => {
    render(
      <PropertyPhotos images={fakeImages}/>);

    expect(screen.getAllByAltText(/Photo studio/i).length).toBe(fakeImages.length);
  });
});
