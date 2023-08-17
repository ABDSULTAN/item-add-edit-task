import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllItems from "./pages/items/AllItems";
import EditItems from "./pages/items/EditItems";
import PageLayout from "./layouts/PageLayout";

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route exact path="/" element={<AllItems />} />
        <Route path="/item-edit/:itemCode" element={<EditItems />} />
      </Route>
    </Routes>
  );
}

export default App;
