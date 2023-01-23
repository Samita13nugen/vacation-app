import SignIn from "../Pages/Signin";
import SignUp from "../Pages/Signup";
import ViewLeaves from "../Pages/ViewLeaves";
import Home from "../Pages/Home";
import ApplyLeave from "../Component/ApplyLeave";
import Error from "../Component/Error";

export const routes =[
    {
        path: '/',
        element:<Home content={<ViewLeaves />} />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: '/applyleave',
        element:<Home content={<ApplyLeave />} />
    },
    {
        path: '*',
        element: <Error/>
    },
   
]