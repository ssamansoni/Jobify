import {Alert,FormRow,FormRowSelect} from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";

const AddJob = () => {

  const {isLoading,showAlert,displayAlert,isEditing,position,company,jobLocation,jobType,jobTypeOptions,status,statusOptions,handleChange,clearValues,createJob,editJob} = useAppContext();

  const handleJobInput = (e) => {
    handleChange({name : e.target.name, value: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!position || !company || !jobLocation)
    {
      displayAlert();
      return;
    }

    if(isEditing){
      editJob();
      return;
    }

    createJob();
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'Edit Job' : "Add Job"}</h3>
        {showAlert && <Alert/>}

        <div className="form-center">
          <FormRow type="text" name="position" value={position} handleChange={handleJobInput}/>
          <FormRow type="text" name="company" value={company} handleChange={handleJobInput}/>
          <FormRow type="text" name="jobLocation" labelText="Job Location" value={jobLocation} handleChange={handleJobInput}/>
          
          <FormRowSelect name="jobType" labelText="Job Type" value={jobType} handleChange={handleJobInput} options={jobTypeOptions} />
          <FormRowSelect name="status" value={status} handleChange={handleJobInput} options={statusOptions} />

          <div className="btn-container">
            <button type="submit" className="btn btn-block submit-btn" onClick={handleSubmit} disabled={isLoading}>
              Submit
            </button>
            <button type="clear" className="btn btn-block clear-btn" onClick={(e) => {
              e.preventDefault();
              clearValues();
            }}>
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
