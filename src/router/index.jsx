import { createHashRouter} from "react-router-dom";
import FrontLayout from "../layout/FrontLayout";
import HomePage from "../pages/Home";
import ArticlePage from "../pages/NewsDetail";

const router = createHashRouter([
    {
        path: "/",
        element: <FrontLayout/>,
        children: [   {
            index: true,
            element: <HomePage />
        },
        {
            path: "article/:id",
            element: <ArticlePage/>
        }]
    }
 
])

export default router;
