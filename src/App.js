import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Atbash from "./components/Atbash";
import FourSquareCipher from "./components/FourSquereCipher";
import Navbar from "./components/Navbar";
import Vigenere from "./components/Vigenere";

function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/*" element={<p></p>}></Route>
                    <Route path="/atbash" element={<Atbash></Atbash>} />
                    <Route path="/vigenere" element={<Vigenere></Vigenere>} />
                    <Route
                        path="/foursquare"
                        element={<FourSquareCipher></FourSquareCipher>}
                    />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}

export default App;
