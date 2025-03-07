import netherlandsRecruiter from './jeremy-akeze-doghouse-it-recruitment.jpg';
import * as S from './style';

/**
 * Recruiter Component
 * 
 * This component displays information about a recruiter from Doghouse IT Recruitment
 * who is looking for software engineers to work in the Netherlands.
 * 
 * The component consists of:
 * - A profile thumbnail image of the recruiter
 * - A description section containing:
 *   - A heading with text and a Netherlands flag
 *   - A paragraph with the recruiter's message and a LinkedIn link
 * 
 * @returns {JSX.Element} A recruiter profile card component
 */
const Recruiter = () => (
  <S.Container>
    <S.Thumbnail>
      <img
        alt="Jeremy Akeze - Doghouse IT Recruitment"
        src={netherlandsRecruiter}
      />
    </S.Thumbnail>
    <S.Description>
      <h4>
        Work in the Netherlands
        <S.Flag />
      </h4>
      <p>
        Hi! I'm Jeremy Akeze from Doghouse IT Recruitment and I'm looking for
        skilled Software Engineers like you. If you wish to move abroad,{' '}
        <a href="https://www.linkedin.com/in/jeremy-akeze-9542b396/">
          <b>follow me on Linkedin.</b>
        </a>
      </p>
    </S.Description>
  </S.Container>
);

export default Recruiter;