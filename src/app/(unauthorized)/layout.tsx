import { UnauthorizedLayout } from 'layouts';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UnauthorizedLayout>{children}</UnauthorizedLayout>;
}
