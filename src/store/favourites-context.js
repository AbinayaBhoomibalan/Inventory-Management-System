import { createContext, useState } from "react";

const FavouritesContext = createContext({
    favourites: [],
    totalFavorites: 10,
    addFavourite: (favouriteMeetup) => {},
    removeFavourite: (meetupId) => {},
    itemIsFavourite: (meetupId) => {}
});

export function FavouritesContextProvider(props) {
    const [userFavourites, setUserFavorites] = useState([]);
    
    function addFavouriteHandler(favouriteMeetup){
        setUserFavorites((prevUserFavourites) => {
            return prevUserFavourites.concat(favouriteMeetup);
        });  
    }

    function removeFavouriteHandler(meetupId){
        setUserFavorites((prevUserFavourites) => {
            return prevUserFavourites.filter(meetup => meetup.id !== meetupId);
        })
    }

    function itemIsFavouriteHandler(meetupId){
        return userFavourites.some(meetup => meetup.id === meetupId )
    }
    
    const context = {
        favourites: userFavourites,
        totalFavorites: userFavourites.length,
        addFavourite: addFavouriteHandler,
        removeFavourite: removeFavouriteHandler,
        itemIsFavourite: itemIsFavouriteHandler
    };
    
    return <FavouritesContext.Provider value = {context}>
        {props.children}
    </FavouritesContext.Provider>
}

export default FavouritesContext;