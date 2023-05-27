import Wrapper from '../assets/wrappers/SearchContainer';
import {FormRow , FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';

const SearchContainer = () =>
{
  const {
    isLoading , search , searchStatus , searchType , sort , sortOptions , jobTypeOptions , statusOptions , handleChange , clearFilters
  } = useAppContext();

  const handleSearch = (e) => {
    if(isLoading) return;

    handleChange({name: e.target.name,value: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  }

  return <Wrapper>
    <form className='form'>
      <h4>Search Form</h4>
      <div className='form-center'>
        <FormRow
          type='text'
          name='search'
          value={search}
          handleChange={handleSearch}
        />

        <FormRowSelect
          labelText='status'
          name='searchStatus'
          value={searchStatus}
          handleChange={handleSearch}
          options={['all', ...statusOptions]}
        />

        <FormRowSelect
          labelText='Type'
          name='searchType'
          value={searchType}
          handleChange={handleSearch}
          options={['all', ...jobTypeOptions]}
        />

        <FormRowSelect
          name='sort'
          value={sort}
          handleChange={handleSearch}
          options={['all', ...sortOptions]}
        />

        <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>
          Clear Filters
        </button>
      </div>
    </form>
  </Wrapper>
}

export default SearchContainer
