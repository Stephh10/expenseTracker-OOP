
class Store {
    static loadExpenses() {
        let expenses 
        if(localStorage.getItem("expenses") == null) {
            expenses = []
        }
        else {
            expenses = JSON.parse(localStorage.getItem("expenses"))
        }
        return expenses
    }

    static createExpense(expense) {
        let expenses = Store.loadExpenses()
        expenses.push(expense)
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }

    static deleteExpense(exIndex) {
        let expenses = Store.loadExpenses()
        expenses.forEach((expense, index) => {
            if(expense.index == exIndex) {
                expenses.splice(index, 1)
            }
        })
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }

    static loadTotal() {
        let total 
        if(localStorage.getItem("total") == null) {
            total = 0
        }
        else {
            total = JSON.parse(localStorage.getItem("total"))
        }
        return total
    }

    static addTotal(newTotal) {
        let total = this.loadTotal()
        total = newTotal
        localStorage.setItem("total", JSON.stringify(total))
    }
    
}






let totalB = document.querySelector(".totalB")
let expenses = document.querySelector(".expenses")
let balance = document.querySelector(".balance")

let expensesPrice = 0

balance.innerHTML = 0
expenses.innerHTML = 0



let totalNum = parseFloat(Store.loadTotal())
totalB.innerText = totalNum




class Item {
    constructor(title, price, index) {
        this.title = title
        this.price = price
        this.index = index
    }
}

class Ui {
    static displayExpenses() {
        const expenses = Store.loadExpenses()
        expenses.forEach((expense) => Ui.showExpenses(expense))
    }
 
    static showExpenses(expense) {
        let mainEl = document.querySelector(".tableList")
        let row = document.createElement("tr")
        row.innerHTML = `
        <th>${expense.index}</th>
        <th>${expense.title}</th>
        <th>${expense.price}</th>
        <th><a href="" class="btn btn-danger btn-sm">Delete</a></th>
        `

        mainEl.append(row)

        expensesPrice += parseFloat(expense.price)
        expenses.innerHTML = expensesPrice

        balance.innerHTML = totalNum - expensesPrice
        console.log(totalNum - expensesPrice)

    }


    static resetInputs() {
        document.querySelector("#title").value = ""
        document.querySelector("#price").value = ""
    }

    static removeElement(el) {
        el.parentElement.parentElement.remove()
    }

}

document.addEventListener("DOMContentLoaded", Ui.displayExpenses)

// EXPENSES FORM

document.querySelector("#expense-form").addEventListener("submit", (e) => {
    e.preventDefault()
    let title = document.querySelector("#title").value
    let price = document.querySelector("#price").value
    let index = 1

    let expense = new Item(title,price,index)

    Ui.showExpenses(expense)
    Ui.resetInputs()
    Store.createExpense(expense)
})

//DELETE ITEM
document.querySelector(".tableList").addEventListener("click", (e) => {
    Ui.removeElement(e.target)
    Store.deleteExpense(e.target.parentElement.parentElement.firstElementChild.textContent)
})

//BUDGET FORM

document.querySelector("#totalForm").addEventListener("submit", (e) => {
    let totalInput = document.querySelector("#totalInput").value
    Store.addTotal(totalInput)
})



