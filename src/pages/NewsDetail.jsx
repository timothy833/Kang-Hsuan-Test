import { useLocation, useNavigate } from 'react-router-dom';

const NewsDetail = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const { data }  = location.state || {};
    return(
    <div className='container my-4'>
       <h2>{data?.標題}</h2>
        <p dangerouslySetInnerHTML={{__html: data?.內容}}/> 
        <p>{data?.上版日期}</p>
        <a href={data?.來源網址} target='_black'>來源連結</a>
        <div className='mt-3'>
            <button className='btn btn-secondary' onClick={()=> navigate("/")}>返回新聞列表</button>
        </div>
    </div>)
}

export default NewsDetail;