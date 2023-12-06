import "./MyTaskPage.css"
import NavBar from "../../components/ui/NavBar/NavBar"
import MyTaskList from "../../components/MyTaskList/MyTaskList"
import Footer from "../../components/ui/Footer/Footer"

function MyTaskPage() {
  return (
    <>
        <NavBar />
        <MyTaskList />
        <Footer />
    </>
  )
}

export default MyTaskPage