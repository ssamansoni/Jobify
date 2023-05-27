import { useEffect } from "react"
import { useAppContext } from "../context/appContext"
import {Loading , Job} from "./";
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {

  const {search, searchType , searchStatus, sort, getAllJobs , userjobs, isLoading, page , totalJobs , numOfPages} = useAppContext();

  useEffect(() => {
    getAllJobs();
    // eslint-disable-next-line
  },[page, search, searchType , searchStatus, sort])

  if(isLoading)
  {
    return <Loading center/>;
  }

  if(userjobs.length === 0)
  {
    return(
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
      {totalJobs} job{userjobs.length>1 && 's'} found
      </h5>

      <div className="jobs">
        {userjobs.map((job) => {
          return <Job key={job._id} {...job}/>
        })}
      </div>

      {numOfPages>1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobsContainer
