import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";

let App = () => {


    return (
        <Router>
            <>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />

                    <Route path="*" element={<About />} />
                </Routes>
            </>
        </Router>
    )
}

export default App;

// visit this to understand how to use router with webpack
//  https://dev.to/jordan_smith/how-to-build-a-react-app-using-react-router-v6-without-create-react-app-4fe3