
import Header from "../components/header"
import Footer from "../components/footer"
export const metadata = {
  title: "Aurelius National Scholarship Examination (ANSE)",
  description:
    "National scholarship exam for JEE and NEET aspirants with ₹1 Crore prize pool.",
   icons: {
    icon: "/favicon.ico"
  } 

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body style={{
        margin:0,
        fontFamily:"system-ui, -apple-system, sans-serif",
        background:"#f8fafc"
      }}>

        {/* HEADER */}
        <Header />

        {/* PAGE CONTENT */}
        <main style={{
          minHeight:"80vh"
        }}>
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </body>

    </html>
  )
}