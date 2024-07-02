import List from "./components/List"
import Login from "./components/Login"
import PopUp from "./components/PopUp"
import Window from "./components/Window"


function App() {
  const user = false
  return (
    <>

      {
        user ? (
          <>  
          <Window />
          <PopUp />
          </>
        ) : (<Login />)
      }
      
  
    </>
  )
}

export default App
