import "./globals.css";

export const metadata = {
  title: "Elo LLM Ranking",
  description: "App to rank Large Language Models based on Elo rating",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
