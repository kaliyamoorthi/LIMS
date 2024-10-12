import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Laboratory from "./home/Laboratory";

import labData from "./data/lab_data.json";
import { useEffect } from "react";
import { fetchLabs, setLabs } from "./redux/labSlice";

function App() {
  const dispatch = useDispatch();
  const labs = useSelector((state) => state.labs.labs);
  useEffect(() => {
    dispatch(fetchLabs()); // Fetch labs (from localStorage or JSON)
  }, [dispatch]);

  return (
    <div className="">
      <Laboratory />
    </div>
  );
}

export default App;
