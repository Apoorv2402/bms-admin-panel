import Page from 'components/molecules/Page/Page.component';
import React from 'react';

import './Home.style.css';
import HomeFavorites from './HomeFavorities.component';

export default function Home() {
  return (
    <Page>
      <HomeFavorites />
    </Page>
  );
}
