import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAppContext } from '../context/appContext';
import {HiChevronDoubleLeft , HiChevronDoubleRight} from 'react-icons/hi';

const PageBtnContainer = () => {
  const {numOfPages , page , changePage} = useAppContext();

  const nextPage = () => {
    changePage(page===numOfPages-1 ? numOfPages : (page+1)%(numOfPages));
  }

  const prevPage = () => {
    changePage(page===1 ? numOfPages : page-1);
  }

  const pages = Array.from({length:numOfPages},(_,index)=>{
    return index+1;
  })

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft/>
        Prev
      </button>

      <div className="btn-container">
        {pages.map((pageNumber) => {
          return <button type='button' className={pageNumber===page ? 'pageBtn active' : 'pageBtn'} key={pageNumber} onClick={()=>changePage(pageNumber)}>
            {pageNumber}
          </button>
        })}
      </div>

      <button className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight/>
        Next
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
