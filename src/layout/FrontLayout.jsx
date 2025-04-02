import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router";
import axios from "axios";

export const SearchContext = createContext();

const PAGE_SIZE = 10;

const fontSizeOptions = [
    { size: "14px", label: "小" },
    { size: "16px", label: "中" },
    { size: "18px", label: "大" },
];
  

const FrontLayout = ()=> {
    const [fontSize, setFontSize] = useState(
        localStorage.getItem("fontSize") || "16px"  
    );

    const [news, setNews] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = async () => {
    const params = {
        keyword:keyword,
        StarDate: startDate,
        EndDate:  endDate,
        MaxSize: 100,
        IsRemoveHtmlTag: true,
    };
    try {
        const res = await axios.get("api/news", { params });
        // 防呆處理，確保不會出錯
        const sorted = Array.isArray(res.data)
        ? res.data.sort(
            (a, b) => new Date(b.上架日期) - new Date(a.上架日期)
            )
        : [];
        setNews(sorted);
        setPage(1);
        setHasMore(sorted.length > PAGE_SIZE);
    } catch (err) {
        console.error("API 失敗", err);
    }
    };
    


    useEffect (() => {  
        document.body.style.fontSize = fontSize;
        localStorage.setItem("fontSize", fontSize);
    }, [fontSize]);

    return  (
        <SearchContext.Provider
            value={{
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
            }}
        >
            <header className="p-3 bg-dark text-white text-center mb-2"><h3>行政院新聞網</h3></header>
            <div className="d-flex gap-2 py-2 px-3">
                <h4> 內文字體調整</h4>
                {fontSizeOptions.map((option) => (
                <button
                    key={option.size}
                    className={`btn btn-sm btn-outline-primary ${
                    fontSize === option.size ? "active" : ""
                    }`}
                    onClick={() => setFontSize(option.size)}
                >
                    {option.label}
                </button>
                ))}
            </div>
            
            <main>
                <Outlet/>
            </main>
        </SearchContext.Provider>
    )
}

export default FrontLayout;