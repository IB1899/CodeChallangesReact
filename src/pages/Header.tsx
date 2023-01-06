import {useNavigate} from "react-router-dom"

const Header = () => {

    let navigate = useNavigate();

    return (
        <header>
            <h2 className="logo">Vite & React</h2>

            <ul>
                <li onClick={() => navigate("/")} >Home</li>
                <li onClick={() => navigate("/about")} >About</li>
            </ul>
        </header>
    );
}

export default Header;