// Write your code here
import './index.css'

const MoneyDetails = (props) => {
    const {balance, income, expense} = props

    return(
        <ul className="money-items">
            <li key="0" className="money-item-1 item">
                <img className="money-item-img" alt="balance" src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"/>
                <div>
                    <p className="title"> Your Balance</p>
                    <p data-testid="balanceAmount" className="rupees-text"> Rs {balance} </p>
                </div>
            </li>
            <li key="1" className="money-item-2 item">
                <img className="money-item-img" alt="income" src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"/>
                <div>
                    <p className="title"> Your Income</p>
                    <p data-testid="incomeAmount" className="rupees-text"> Rs {income} </p>
                </div>
            </li>
            <li key="2" className="money-item-3 item">
                <img className="money-item-img" alt="expenses" src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"/>
                <div>
                    <p className="title"> Your Expenses</p>
                    <p data-testid="expensesAmount" className="rupees-text"> Rs {expense} </p>
                </div>
            </li>
        </ul>
    )
}

export default MoneyDetails