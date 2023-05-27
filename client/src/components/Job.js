import moment from 'moment';
import {FaLocationArrow , FaBriefcase , FaCalendarAlt } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/Job';
import {JobInfo} from './';
import { useAppContext } from '../context/appContext';
import { Link } from 'react-router-dom';

const Job = ({_id , position , company,jobLocation , jobType , createdAt , status}) => {
  let date = moment(createdAt);
  date = date.format('Do MMMM, YYYY');

  const {deleteJob,setEditJob} = useAppContext();

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>

      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow/>} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt/>} text={date} />
          <JobInfo icon={<FaBriefcase/>} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>

        <footer>
          <div className='actions'>
            <Link to='/addjob' className='btn edit-btn' onClick={() => setEditJob(_id)}>
              Edit
            </Link>
            <button type='button' className='btn delete-btn' onClick={() => deleteJob(_id)}>
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
    
  )
}

export default Job
