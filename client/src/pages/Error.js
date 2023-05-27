import { Link } from 'react-router-dom';
import err_img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
        <div>
            <img src={err_img} alt='not_found'/>
            <h3>Not Found</h3>
            <p>We could not find your page</p>
            <Link to='/'>Back Home</Link>
        </div>
    </Wrapper>
  )
}

export default Error
