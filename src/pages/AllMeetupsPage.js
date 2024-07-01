import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './AllMeetupsPage.module.css'
import MeetUpList from "../components/meetup/MeetUpList";


function AllMeetupsPage() {
  // const [isLoading, setIsLoading] = useState(true)
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     "https://first-react-project-4ff5b-default-rtdb.firebaseio.com/meetups.json",
  //   ).then(response =>{
  //     return response.json();
  //   }).then(data=>{
  //     const meetups = [];

  //     for (const key in data){
  //       const meetup = {
  //         id: key,
  //         ...data[key]
  //       };

  //       meetups.push(meetup)
  //     }
  //     setIsLoading(false);
  //     setLoadedMeetups(meetups);
  //   });
  // },[]);

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p>Loading...</p>
  //     </section>
  //   )
  // }

  return (
    <div > {/* Apply style from CSS module */}
      <nav>
        {/* Apply class from CSS module to remove underline */}
        <Link to="/billing-form" className={classes.navLink}>Start Billing!</Link>
      </nav>
    </div>
  );

}

export default AllMeetupsPage;
