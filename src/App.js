import { Routes,Route } from "react-router-dom";
import AllMeetupsPage from "./pages/AllMeetupsPage";
import NewMeetupPage from "./pages/NewMeetupPage";
import FavoritesPage from "./pages/FavoritesPage";
import Layout from "./components/layout/Layout";
import BillingForm from "./pages/BillingForm";
function App() {
  return (
    <Layout>
      
      <Routes>     
        <Route path="/" element = { <AllMeetupsPage /> }>
        </Route>
        <Route path="/new-meetup" element = { <NewMeetupPage />}>
        </Route>
        <Route path="/favorites" element = {  <FavoritesPage /> }>
        </Route>
        <Route path="/billing-form" element = {  <BillingForm /> }>
        </Route>
      </Routes> 
    </Layout>
  );
}

export default App;
