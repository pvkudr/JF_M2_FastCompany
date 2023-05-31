import React from 'react';
import UserMainPage from '../userPage/userMainPage';

function MainPage() {
    // todo change to registered user
    const USER_TO_SHOW_ID = '67rdca3eeb7f6fgeed471815';

        return (
          <UserMainPage
              userId ={USER_TO_SHOW_ID}
              />
        );
}

export default MainPage;
