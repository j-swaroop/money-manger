import {Component} from 'react'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import {v4} from 'uuid'
import TransactionItem from "../TransactionItem"

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const moneyDetailsList = [
  {
    id: 0,
    img_url: "https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png",
    alt: "balance",
    title: "Your Balance",
    backgroundColor: "#ecfccb"
  },
  {
    id: 1,
    img_url: "https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png",
    alt: "income",
    title: "Your Income",
    backgroundColor: "#cffafe"
  },
  {
    id: 2,
    img_url: "https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png",
    alt: "expenses",
    title: "Your Expenses",
    backgroundColor: "#ede9fe"
  }
]

// Write your code here
class MoneyManager extends Component{
  state = {
    titleInput: "",
    amountInput: "",
    typeInput: transactionTypeOptions[0].optionId,
    transactionList: [],
    balance: 0,
    income: 0,
    expense: 0
  }

  isDelete = (id) => {
    const {titleInput, amountInput, typeInput, transactionList, balance, income, expense} = this.state
    
    const filteredHistory = transactionList.filter(eachHistory => eachHistory.id !== id)

    const updateAmount = transactionList.find(eachHistory => eachHistory.id === id)

    if (updateAmount.typeInput === "INCOME"){
      this.setState(prevState => ({
        balance: prevState.balance - parseInt(updateAmount.amountInput),
        income: prevState.income - parseInt(updateAmount.amountInput)
      }))
    }else{
      this.setState(prevState => ({
        balance:  prevState.balance + parseInt(updateAmount.amountInput),
        expense:  prevState.expense - parseInt(updateAmount.amountInput),
      }))
    }


    this.setState({transactionList: filteredHistory})
    
  }

  onSubmitForm = (event) => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput, transactionList, balance, income, expense} = this.state

    if (titleInput !== "" && amountInput !== ""){
      let newHistory = {
        id: v4(),
        titleInput: titleInput,
        amountInput: parseInt(amountInput),
        typeInput: typeInput,
        
      }

      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, newHistory],
        titleInput: "",
        amountInput: "",
        typeInput: transactionTypeOptions[0].optionId,
      }))

      if (typeInput === "INCOME"){
        this.setState(prevState => ({
          income:  parseInt(prevState.income) + parseInt(amountInput),
          balance: parseInt(prevState.balance) + parseInt(amountInput)
        }))
      }else{
        this.setState(prevState => ({
          balance: parseInt(prevState.balance) - parseInt(amountInput),
          expense: parseInt(prevState.expense) + parseInt(amountInput)
        }))
      }
    }  
  }

  onChangeTitle = (event) => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = (event) => {
    this.setState({amountInput: event.target.value})
  }

  selectType = (event) => {
    this.setState({typeInput: event.target.value})
  }

  render(){
    const {transactionList, titleInput, amountInput, typeInput, balance, income, expense} = this.state

    return(
      <div className="bg-container">
        <div className="content-container">
          <div className="money-manager-container">
            <h1 className="heading"> Hi, Richard</h1>
            <p className="description"> Welcome back to your <span> Money Manager </span></p>
          </div>

          {<MoneyDetails balance={balance} income={income} expense={expense} />}

          <div className="transaction-history-container">
            <div className="form-container">
              <h1 className="add-transction-heading"> Add Transaction</h1>
              <form onSubmit={this.onSubmitForm} className="form">

                  <label htmlFor="Title"> TITLE</label>
                  <input value={titleInput} onChange={this.onChangeTitle} id="Title" placeholder="TITLE" type="text"/>

                  <label htmlFor="Amount"> AMOUNT</label>
                  <input value={amountInput} onChange={this.onChangeAmount} id="Amount" placeholder="AMOUNT" type="text"/>

                  <label htmlFor="Type"> Type</label>
                  <select value={typeInput} onChange={this.selectType} id="Type">
                    
                    <option selected value={transactionTypeOptions[0].optionId} key={transactionTypeOptions[0].optionId}> {transactionTypeOptions[0].displayText} </option>
                    <option value={transactionTypeOptions[1].optionId} key={transactionTypeOptions[1].optionId}> {transactionTypeOptions[1].displayText} </option>
                  </select>
                  <button type="submit" className="add-button">Add </button>

                  
              </form>
            </div>

            <div className="history-container">
                <h1 className="add-transction-heading"> History</h1>
                <div className="history-items">
                  <ul className="history">
                    <p className="history-item"> Title</p>
                    <p className="history-item"> Amount</p>
                    <p className="history-item"> Type</p>
                  </ul>
                    <ul className="h">
                      {transactionList.map(eachHistory => <TransactionItem 
                        isDelete={this.isDelete} historyItem={eachHistory} key={eachHistory.id}/>)}
                    </ul>
                </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager