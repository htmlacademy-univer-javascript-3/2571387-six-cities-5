import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mocks/mockComponents';
import Error404 from './404';

describe('Component: Error404', () => {
  it('should render correctly', () => {
    const expectedText = 'Error404.';
    const expectedLinkText = 'На главную страницу';

    render(withHistory(<Error404 />));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
