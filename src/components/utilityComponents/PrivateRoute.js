import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const [user] =  useAuthState(auth);
    useEffect(() => { 
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userID:user.uid})
        }
    }
    
    ,[])

}

