import "./globals.css";
import "animate.css";

export const metadata = {
  title: "Let's Play the game",
  description: "Welcome to the game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
