import { useHistory } from "react-router";

export default function Signout(){
    localStorage.clear();
    const history = useHistory();
    history.push('/');
    return(
        <div></div>
    );
}