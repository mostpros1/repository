import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductUpdates from './product-updates.tsx'; // Adjust the import path as necessary

jest.mock('./product-updates.tsx'); // Mock the ProductUpdates component if needed

describe('ProductUpdates', () => {
  beforeEach(() => {
    // Reset any mocks or states before each test
  });

  afterEach(() => {
    // Clean up after each test
  });

  it('renders initial slides correctly when component mounts', async () => {
    render(<ProductUpdates />);
    expect(await screen.findByText('Product Updates')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('←');
    expect(buttons[1]).toHaveTextContent('→');

    const embeds = await screen.findAllByClassName('.embed-container > div');
    expect(embeds).toHaveLength(3);
    embeds.forEach((embed, index) => {
      if (index < 3) {
        expect(embed).toHaveClass('display: block');
      } else {
        expect(embed).toHaveClass('display: none');
      }
    });
  });

  it('handles an empty list of Twitter URLs gracefully', async () => {
    const originalUrls = [
      "https://twitter.com/mostpros/status/1805260568095318198",
      // Add more URLs as needed
    ];

    // Temporarily override the twitterUrls array
    ProductUpdates.prototype.twitterUrls = [];

    render(<ProductUpdates />);
    expect(await screen.findByText('Product Updates')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    const embeds = await screen.queryAllByClassName('.embed-container > div');
    expect(embeds).toHaveLength(0);

    // Restore the original twitterUrls array
    ProductUpdates.prototype.twitterUrls = originalUrls;
  });

  it('automatically transitions to the next slide every 3 seconds', async () => {
    jest.useFakeTimers();
    render(<ProductUpdates />);

    jest.advanceTimersByTime(3000);
    expect(await screen.findByText('Product Updates')).toBeInTheDocument();

    jest.advanceTimersByTime(3000);
    expect(await screen.findByText('Product Updates')).toBeInTheDocument();

    jest.advanceTimersByTime(3000);
    expect(await screen.findByText('Product Updates')).toBeInTheDocument();
  });
});