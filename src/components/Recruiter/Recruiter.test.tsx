import { screen } from '@testing-library/react';
import { renderWithThemeProvider } from 'utils/test/test-utils';
import Recruiter from './Recruiter';

/**
 * Unit tests for the Recruiter component
 * This component displays information about a recruiter with a thumbnail and description
 */
describe('[components] - Recruiter', () => {
  const setup = () => {
    return renderWithThemeProvider(<Recruiter />);
  };

  test('should render correctly', () => {
    const view = setup();
    expect(view).toMatchSnapshot();
  });

  test('should display the recruiter name and image', () => {
    setup();
    
    // Check if the image is rendered with correct alt text
    const recruiterImage = screen.getByAltText('Jeremy Akeze - Doghouse IT Recruitment');
    expect(recruiterImage).toBeInTheDocument();
    
    // Check that the heading exists with correct text
    const heading = screen.getByText('Work in the Netherlands');
    expect(heading).toBeInTheDocument();
  });

  test('should display a description with link to LinkedIn profile', () => {
    setup();
    
    // Check if the description is present
    const description = screen.getByText(/Hi! I'm Jeremy Akeze from Doghouse IT Recruitment/);
    expect(description).toBeInTheDocument();
    
    // Check if the LinkedIn link is present with correct URL
    const linkedInLink = screen.getByText('follow me on Linkedin.');
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink.closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/in/jeremy-akeze-9542b396/');
  });
});