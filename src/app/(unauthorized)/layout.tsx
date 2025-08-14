import { UnauthorizedLayout } from 'shared/layouts';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: Readonly<LayoutProps>) => <UnauthorizedLayout>{children}</UnauthorizedLayout>;

export default Layout;
