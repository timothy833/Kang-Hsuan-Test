
const Pagination = ({total, current, onPageChange})=> {
    const visiblePages =  ()=>{
        const pages = [];
        if(total <= 5){
            for(let i = 1; i <= total; i++){
                pages.push(i);
            }
        } else {
            if(current <= 3){
                pages.push(1,2,3,"...",total);
            } else if(current >= total - 2){
                pages.push(1,"...", total - 2, total - 1, total);
            } else {
                pages.push(1,"...", current,"...", total);
            }
        }
        return pages;
    };

    const handleClick = (page)=>{
        if(page !== "..." && page !== current){
            onPageChange(page);
        }
    }
    

    return (
    <nav className="d-flex justify-content-center my-3"> 
        <ul className="pagination">
            <li className={`page-item ${current === 1 ? "disabled": ""}`} >
            <button className="page-link" onClick={()=> onPageChange(current -1)}> &laquo;</button>
            </li>

            {visiblePages().map((page, index)=>(
                <li key={index} className={`page-item ${page === current ? "active": ""} ${page === "..." ? "disabled" : ""}`}>
                    <button className="page-link" onClick={()=> handleClick(page)}>{page}</button>
                </li>
            ))}
            <li className={`page-item ${current=== total ? "disabled": ""}`}>
                <button className="page-link" onClick={()=> onPageChange(current + 1)}>&raquo;</button>
            </li>
        </ul>        
    </nav>)
}

export default Pagination;