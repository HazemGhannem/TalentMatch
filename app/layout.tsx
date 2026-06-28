import './globals.css';

export const metadata = {
  title: 'CV Matcher',
  description:
    'See how your CV stacks up against a job description, and get a tailored rewrite.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav className="navbar">
          <a href="/" className="navbar-logo">
            <span className="navbar-logo-icon">CV</span>
            CV Matcher
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
