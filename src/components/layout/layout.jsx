import React from 'react';

import Header from '../header/header';
import { useStore } from '../../hooks-store/store';

const Layout = ({headerData, isWide = false, children}) => {
  const state = useStore()[0];

  return (
    <main className={`main${isWide ? ' main--wide' : ''}${state.isModalOpened ? ' no-scroll' : ''}`}>
      <div className="main__wrap">
        <Header
          headerData={headerData}
        />
        {children}
      </div>
    </main>
  )
};

export default Layout;
