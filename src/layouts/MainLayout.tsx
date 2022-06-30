import React, {FC} from 'react';
import "../styles/general/reset.scss";
import cl from "../styles/layouts/MainLayout.module.scss";

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({children}) => {
  return (
    <div className={cl.main}>
      {children}
    </div>
  );
};

export default MainLayout;
