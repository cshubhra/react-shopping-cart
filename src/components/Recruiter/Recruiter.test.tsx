import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from 'commons/style/theme';
import Recruiter from './Recruiter';

describe('[components] - Recruiter', () => {
  const setup = () => {
    return render(
      <ThemeProvider theme={theme}>
        <Recruiter />
      </ThemeProvider>
    );
  };

  test('should render correctly', () => {
    const view = setup();
    expect(view).toMatchSnapshot();
  });

  test('should display correct recruiter name and information', () => {
    const { getByText, getByAltText } = setup();
    
    // Check if the recruiter's name is displayed
    expect(getByAltText('Jeremy Akeze - Doghouse IT Recruitment')).toBeInTheDocument();
    
    // Check if the country information is displayed
    expect(getByText('Work in the Netherlands')).toBeInTheDocument();
    
    // Check if the recruiter's message is displayed
    expect(getByText(/Hi! I'm Jeremy Akeze from Doghouse IT Recruitment/)).toBeInTheDocument();
    
    // Check if the call to action is displayed
    expect(getByText('follow me on Linkedin.')).toBeInTheDocument();
  });
  
  test('should have a working LinkedIn link', () => {
    const { getByText } = setup();
    const linkElement = getByText('follow me on Linkedin.').closest('a');
    expect(linkElement).toHaveAttribute('href', 'https://www.linkedin.com/in/jeremy-akeze-9542b396/');
  });
});