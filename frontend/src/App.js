import "./App.css";
import Dashboard from "./pages/dashboard";
import Campaign from "./pages/campaign";
import EmailTemplate from "./pages/emailTemplate";
import Report from "./pages/report";
import ReportView from "./pages/reportView";
import Profile from "./pages/profile";
import CampaignConfigure from "./pages/CampaignConfigure ";
import Configure from "./pages/configure";
import { DataProvider } from "./pages/components/context/DataContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/campaign" element={<Campaign />}></Route>
            <Route path="/email/template" element={<EmailTemplate />}></Route>
            <Route path="/report" element={<Report />}></Route>
            <Route path="/report/view" element={<ReportView />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/from" element={<CampaignConfigure />}></Route>
            <Route path="/configure" element={<Configure />}></Route>
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
