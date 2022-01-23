import {Redirect, Route} from "react-router-dom";

const AuthenticatedRoute = ({ component: Component, ...restOfProps }) => {
    const checkStatus = 
    JSON.parse(localStorage.getItem("profile"))?.result?.status;
    const googleId = JSON.parse(localStorage.getItem("profile"))?.result?.googleId;
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                googleId || checkStatus === "Active" ? <Component {...props} /> : <Redirect to="/auth" />
            }
        />
    );
}

export default AuthenticatedRoute;