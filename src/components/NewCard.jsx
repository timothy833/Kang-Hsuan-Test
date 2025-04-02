import { Link } from "react-router-dom";

const NewCard = ({data, refProp})=>{

    return (
    <div className="card mb-3" ref={refProp}>
        <div className="card-body">
            <h5 className="card-title">{data.標題}</h5>
            <p className="card-text">{data.上版日期}</p>
            <Link to={`/article/${data.標題}`} state={{data,}}>
                閱讀更多....
            </Link>
        </div>
        
    </div>)
}

export default NewCard;