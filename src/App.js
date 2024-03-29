import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"

export default function App() {
  const [user, setUser] = useState();
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage setUser={setUser}/>} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage user={user} setUser={setUser}/>} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          <Route path="/editar-transacao/:tipo" element={<TransactionsPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
