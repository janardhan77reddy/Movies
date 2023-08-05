import React from "react";
import { Link } from "react-router-dom";


function App() {
    return (
        <div className="App">
            <h1>Hello This Is movies Website</h1>
            <Link to={"/movies"}>
            <button>
                Open
            </button>
            </Link>
        </div>
    );
}



export default App;