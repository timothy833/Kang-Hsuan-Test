import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import Loader from "../components/Loader";

export const SearchContext = createContext();

const PAGE_SIZE = 10;

const fontSizeOptions = [
    { size: "14px", label: "小" },
    { size: "16px", label: "中" },
    { size: "18px", label: "大" },
];

const baseURL =
  import.meta.env.MODE === "production"
    ? "https://us-central1-timothy1994-ee7db.cloudfunctions.net/api"
    : "/api";

  

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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (keyword || startDate || endDate) {
            const searchState = { keyword, startDate, endDate, page };
            localStorage.setItem("searchState", JSON.stringify(searchState));
        }
    }, [keyword, startDate, endDate, page]);

    // --- 重新整理還原狀態 ---
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("searchState"));
        if (saved) {
        setKeyword(saved.keyword );
        setStartDate(saved.startDate );
        setEndDate(saved.endDate);
        setPage(saved.page);
        fetchData();
        }
    }, []);

    const fetchData = async () => {
        const params = {
            keyword:keyword,
            StarDate: startDate,
            EndDate:  endDate,
            MaxSize: 100,
            IsRemoveHtmlTag: true,
        };

        try {
            setLoading(true);
            const res = await axios.get( `${baseURL}/news`, { params });
            // 防呆處理，確保不會出錯
            const sorted = Array.isArray(res.data)
            ? res.data.sort(
                (a, b) => new Date(b.上架日期) - new Date(a.上架日期)
                )
            : [];
            setNews(sorted);
            setHasMore(sorted.length > PAGE_SIZE);
            setLoading(false);
        } catch (err) {
            console.error("API 失敗", err);
            setLoading(false);
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
            setLoading,
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

            {loading && <Loader/>}
        </SearchContext.Provider>
    )
}

export default FrontLayout;