import React from "react";
import '@/assets/styles/globals.css'


 export const metadata = {
     title:'PropertyPulse | find the perfect rental',
     description : 'Find your dream rental property'
 }

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
