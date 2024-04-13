import '@/assets/styles/globals.css'
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';
import { GlobalProvider } from '@/context/GlobalContext';



 export const metadata = {
     title:'PropertyPulse | find the perfect rental',
     description : 'Find your dream rental property'
 }

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
    <AuthProvider>
    <html lang="en">
      <body>
      <Navbar />
        <main>{children}</main>

        <Footer />
        <ToastContainer />
      </body>
    </html>
    </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
