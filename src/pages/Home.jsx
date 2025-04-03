import {useState, useEffect, useRef, useContext } from "react";
import NewCard from "../components/NewCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { SearchContext } from "../layout/FrontLayout";

const Home = ()=> {
    const {
        keyword,
        setKeyword,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        page,
        setPage,
        news,
        setNews,
        hasMore,
        setHasMore,
        fetchData,
        PAGE_SIZE,
      } = useContext(SearchContext);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [loading, setLoading] = useState(false);
    const observer  = useRef();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const handleSearch = async(e)=> {
        e.preventDefault();
        setLoading(true);
        setPage(1);
        await fetchData();
        setLoading(false);
    } 

    const handleClear = () => {
        setKeyword("");
        setStartDate("");
        setEndDate("");
        setNews([]);
        setPage(1);
        localStorage.removeItem("searchState");
      };

    const pageNews = isMobile
    ? news.slice(0, page * PAGE_SIZE) // infinite scroll
    : news.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE); // pagination

     // Infinite Scroll for Mobile
    const lastNewRef = (node)=> {
        if(!isMobile|| !hasMore) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting){
                setLoading(true);
                setPage((prev)=> {
                    const nextPage = prev + 1;
                    setHasMore(nextPage * PAGE_SIZE < news.length);
                    return nextPage;
                });
                setLoading(false);
            }
        });
        if(node) observer.current.observe(node);
    }

    return (<>
        <div className="container my-4">
            {/*搜尋表單*/}
            <form onSubmit={handleSearch} className="mb-4">
                <div className="row g-2">
                    <div className="col-md-4">
                        <input type="text" 
                            className="form-control"
                            placeholder="關鍵字"
                            value={keyword}
                            onChange={(e)=> setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <input type="date"
                               className="form-control"
                               value={startDate}
                               onChange={(e)=> setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <input type="date" 
                                className="form-control"
                                value={endDate}
                                onChange={(e)=> setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 d-flex gap-2">
                        <button type="submit" className="btn btn-primary">
                            搜尋
                        </button>
                        <button type="button" className="btn btn-outline-secondary" onClick={handleClear}>
                            清空
                        </button>
                    </div>
                </div>
            </form>

         {/*新聞列表*/}
            <div className="news-list">
                {pageNews.map((item, index)=>(
                    <NewCard 
                        key={index}
                        data={item}
                        refProp={ isMobile && index === pageNews.length -1 ? lastNewRef: null}
                    />
                ))}
            </div>   


            {/*分頁或無限滾動 */}
            {news.length > 0 && !isMobile &&(<Pagination
                total={Math.ceil(news.length / PAGE_SIZE)}
                current={page}
                onPageChange={(p)=> {
                    setPage(p)
                }}
            />)}

            {loading && <Loader/>}
        </div>
    
    </>)
}

export default Home;