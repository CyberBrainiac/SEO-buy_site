import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';

const RootLayout: React.FC = () => {
  return (
    <section>
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default RootLayout;
