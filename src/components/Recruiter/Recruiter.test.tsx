import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../commons/style/styled-components';
import theme from '../../commons/style/theme';
import Recruiter from './Recruiter';

/**
 * Recruiter Component Unit Tests
 * 
 * This test suite verifies that the Recruiter component renders correctly,
 * including all its child elements like the thumbnail, flag, heading, and link.
 */
describe('[components] - Recruiter', () => {
  const setup = () => {
    return render(
      <ThemeProvider theme={theme}>
        <Recruiter />
      </ThemeProvider>
    );
  };

  it('should render correctly', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display the recruiter thumbnail image', () => {
    setup();
    const image = screen.getByAltText('Jeremy Akeze - Doghouse IT Recruitment');
    expect(image).toBeInTheDocument();
  });

  it('should display the correct heading with country', () => {
    setup();
    const heading = screen.getByText('Work in the Netherlands');
    expect(heading).toBeInTheDocument();
  });

  it('should contain a flag element', () => {
    setup();
    // Since the flag is a styled span without text, we can test it's parent contains it
    const heading = screen.getByText('Work in the Netherlands');
    expect(heading.querySelector('span')).toBeInTheDocument();
  });

  it('should contain recruiter description text', () => {
    setup();
    const description = screen.getByText(/Hi! I'm Jeremy Akeze from Doghouse IT Recruitment/i);
    expect(description).toBeInTheDocument();
  });

  it('should include a LinkedIn link', () => {
    setup();
    const link = screen.getByText('follow me on Linkedin.');
    expect(link.tagName).toBe('B');
    expect(link.closest('a')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/jeremy-akeze-9542b396/'
    );
  });
});