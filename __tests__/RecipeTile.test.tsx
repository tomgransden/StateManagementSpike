import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import RecipeTile from '../components/RecipeTile';
import mockSearchResults from '../mocks/mockSearchResults';

describe('RecipeTile', () => {
  it('Should render correctly', () => {
    render(<RecipeTile item={mockSearchResults.data[0]} onPress={() => {}} />);

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('Should call onPress', () => {
    const mockOnPress = jest.fn();
    render(
      <RecipeTile item={mockSearchResults.data[0]} onPress={mockOnPress} />,
    );

    fireEvent.press(screen.getByText('Spaghetti and meatballs'));

    expect(mockOnPress).toBeCalled();
  });
});
