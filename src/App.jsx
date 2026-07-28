import CreateGroup from './components/CreateGroup'
import CreateExpense from './components/CreateExpense'
import ExpenseList from'./components/ExpenseList'
import {Routes , Route } from 'react-router-dom'

export default function App(){
  return(
    <>
    <Routes>
      <Route path="/" element={<CreateGroup/>}/>
      <Route path="/createExpense" element={ <CreateExpense/>}/>
      <Route path="/expenseList" element={ <ExpenseList/>}/>

    </Routes>
    </>
  )
}