// Write your code here
// Write your code here
import './index.css' 

const TransactionItem = (props) => {
    const {historyItem, isDelete} = props
    const {id, titleInput, amountInput, typeInput} = historyItem


    const deleteHistory = () => {
        isDelete(id)
    }

    const typeInputText = typeInput === "INCOME"? "Income": "Expenses"

    return(
        <li>
            <p> {titleInput}</p>
            <p> Rs {amountInput}</p>
            <p> {typeInputText}</p>
            <button onClick={deleteHistory} data-testid="delete" type="button">
                <img alt="delete" src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png" />
            </button>

        </li>
    )
}

export default TransactionItem