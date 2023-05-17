import { useDispatch } from "react-redux"; 
import { authUser } from "../_actions/user_actions"; 
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export default function AuthenticationCheck(SpecificComponent, option, adminRoute = null) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(authUser()).then(response => {
      if (response.payload.isAuth) {
        navigate('/')
      }
    });
  }, [dispatch, navigate]);

  return <SpecificComponent />;
}