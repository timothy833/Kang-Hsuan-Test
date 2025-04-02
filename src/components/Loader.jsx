import ClipLoader from "react-spinners/ClipLoader";
import './Loader.css';

const Loader = ()=>{

    return (
    <div className="loading-overlay">
        <ClipLoader color={"#000"} size={40} />
    </div>)
}

export default Loader;