import "./globals.css";

export const metadata = {
  title: "Movie Explorer",
  description: "A small movie search and favorites app"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
