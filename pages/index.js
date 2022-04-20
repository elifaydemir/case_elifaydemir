import Header from "./components/Head";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="travel-go">
      <Header title={"Travel.go - Flight Service"} description={"Travel.go Flight Service"} />
      <Navbar />
        <Main />
        <Footer/>
    </div>
  )
}
