import { useState, useEffect } from "react"
import {Logo , FormRow , Alert} from '../components';
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import {useNavigate} from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {

  const navigate = useNavigate();
  const [values,setValues] = useState(initialState);

  //global states
  const {user , showAlert,displayAlert , isLoading , registerUser , loginUser} = useAppContext();

  const toggleMember = () => {
    setValues({...values , isMember:!values.isMember})
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const {name,email,password,isMember} = values
    if(!email || !password || (!isMember && !name)){
      displayAlert()
      return
    }
    const currentUser = {name,email,password}

    if(isMember){
      loginUser(currentUser)
    }
    else{
      registerUser(currentUser);
    }
  }

  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/');
      },1000);
    }
  },[user,navigate])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember?'Login':'Register'}</h3>
        {showAlert && <Alert />}

        {/*inputs*/}
        {/*name*/}
        {!values.isMember && <FormRow
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
        />}

        {/*email*/}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/*password*/}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>Submit</button>

        <p>
          {!values.isMember ? "Already a member ?" : "Not a member yet ?"}
          <button 
            type="button" 
            onClick={toggleMember} 
            className='member-btn'>
              {!values.isMember?"Login":"Register"}
          </button>
        </p>
      </form>
    </Wrapper>

  )
}

export default Register
