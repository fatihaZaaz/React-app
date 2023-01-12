import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import './Planner.css';
import { useRef } from 'react';


export default function Planner() {
    const [budgetElem, setBudgetElem] = useState('p')
    const [mode, setMode] = useState('p')
    const [spent, setSpent] = useState(0)
    const [left, setLeft] = useState(0)
    const [budgetInput, setInput] = useState('')
    const [button, setButton] = useState('edit')
    const [budget, setBudget] = useState(0)
    const [expansesList, setExpansesList] = useState([])
    const [expansesData, setExpansesData] = useState([[]])
    const [displayForm, setDisplayForm] = useState("formHidden")
    const [leftColour, setLeftColour] = useState("card-content")
    const [ExpanseInput, setExpanseInput] = useState("edit")
    const [expanseBudgetValue, setExpanseBudgetValue] = useState()
    const refs = {
        budget: useRef(null),
        budgetInput: useRef(null),
        form: useRef(null),
        expanseName: useRef(null),
        expanseBudget: useRef(null)
    };

    const edit = () => {
        // const newBudget = budgetInput.current.value
        setBudgetElem('input')
        setButton("save")
    }
    const updateBudget = () => {
        console.log("budget " + budget)
        // console.log(refs.budgetInput.current.value)
        const newBudget = refs.budgetInput.current.value
        console.log("newBudget : " + newBudget)
        if (newBudget.length !== 0) {
            console.log("oui")
            setBudget(newBudget)
            const p = <p className="card-content" ref={refs.budgetInput} >{newBudget}</p>
            setInput(p);

        }
        else {
            const p = <p className="card-content" ref={refs.budgetInput} >{budget}</p>
            setInput(p);

        }
        setButton('edit')
        setBudgetElem('p')
    }

    const addExpanse = () => {

        const display = "cards"
        setDisplayForm(display)

    }
    const updateExpanse = () => {

        const display = "formHidden"
        setDisplayForm(display)

        const name = refs.expanseName.current.value
        const budget = refs.expanseBudget.current.value
        const data = [name, budget];
        setExpansesData(expansesData => [...expansesData, data])
        // const expanse =
        //     <div className="card" id={refs.expanseName.current.value}>
        //         <h3 className="card-title">{refs.expanseName.current.value}</h3>
        //         <p className="card-content">Budget : {refs.expanseBudget.current.value}</p>)
        //         <button className="card-btn" onClick={editExpanse} >Edit</button>
        //     </div>
        // console.log(expanse)
        // setExpansesList(expansesList => [...expansesList, expanse])
        // console.log(expansesData)





        refs.expanseName.current.value = ""
        refs.expanseBudget.current.value = ""
    }
    const budgetSpent = () => {
        let sum = 0;
        let innerlist = expansesData
        for (let i = 1; i < innerlist.length; i++) {
            const element = innerlist[i]
            sum += parseInt(element[1]);
            console.log(sum)

        }
        setSpent(sum)
    }
    const budgetLeft = () => {
        const diff = (parseInt(budget) - parseInt(spent))

        if (diff < 0) {
            setLeftColour("black")
        }
        setLeft(diff)
    }
    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        budgetSpent()
        budgetLeft()
        console.log(button)
    });
    const expanseBudgetChange = (event) => {
        setExpanseBudgetValue(event.target.value)
        console.log(expanseBudgetValue)

    }
    const saveExpanse = (event) => {

        const card = event.target.closest('.card');
        console.log("card.id" + card.id)
        for (let i = 1; i < expansesData.length; i++) {
            if (expansesData[i][0] === card.id) {
                console.log('curent' + expanseBudgetValue)
                expansesData[i][1] = expanseBudgetValue
                console.log("khra" + expansesData[i][1])
            }
        }
        console.log("id = " + card.id)
        setExpanseInput("non")

    }
    const editExpanse = (event) => {
        const card = event.currentTarget.closest('.card');
        setExpanseInput(card.id)

    }
    const deleteExpanse = (event) => {
        const card = event.target.closest('.card');
        console.log("card.id" + card.id)
        for (let i = 1; i < expansesData.length; i++) {
            if (expansesData[i][0] === card.id) {
                setExpansesData(expansesData.splice(i,1))
            }
        }
    }
    return (
        <div>
            <h2>My Planner</h2>
            {/* budget info */}
            <div className="wrapper">
                <div className="card">
                    <h3 className="card-title">Budget</h3>
                    {budgetElem === 'p' ?
                        (<p className="card-content" ref={refs.budgetInput} >{budget}</p>)
                        :
                        (<input className="card-content" ref={refs.budgetInput} placeholder={budget} />)
                    }
                    {button === 'edit' ?
                        (<button className="card-btn" onClick={edit}>Edit</button>)
                        :
                        (<button className="card-btn" onClick={updateBudget}>save</button>)

                    }
                </div>
                <div className="card">
                    <h3 className="card-title">Remaining</h3>
                    <p className={leftColour} >{left}</p>
                </div>
                <div className="card">
                    <h3 className="card-title">spent</h3>
                    <p className="card-content">{spent}</p>
                </div>
            </div>

            {/* expenses list  */}
            <div class="main-container">
                <div class="heading">
                    <h2 class="heading__title">Expanses</h2>
                    <input class="image-button" type="image" src="data:image/png;base64,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" alt="Submit" onClick={addExpanse} />
                </div>
                <div class={displayForm} ref={refs.form}>
                    <div class="card card-1 " >
                        <div class="group group1">
                            <input ref={refs.expanseName} type="text" required />
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Name</label>
                        </div>
                        <br></br>

                        <div class="group">
                            <input ref={refs.expanseBudget} type="text" required />
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Budget</label>

                        </div>
                        <div>
                            <button className="card-btn" onClick={updateExpanse}>Save</button>
                        </div>
                    </div>
                </div>
                <div className="wrapper">

                    {expansesData.slice(1).map((item, index) => (
                        <div className="card" id={item[0]}>
                            <input class="image-button1" style={{cursor: 'pointer'}} type="image" src="https://cdn.icon-icons.com/icons2/1769/PNG/512/4115230-cancel-close-cross-delete_114048.png" alt="Delete" onClick={deleteExpanse} />

                            <h3 className="card-title">{item[0]}</h3>
                            {ExpanseInput === item[0] ? (
                                <input className="card-content" onChange={expanseBudgetChange} placeholder={item[1]} placeholdertextcolor='black' />

                            ) : (
                                <p className="card-content">Budget : {item[1]}</p>

                            )
                            }
                            {ExpanseInput === item[0] ? (
                                <button className="card-btn" onClick={saveExpanse} >Save</button>


                            ) : (
                                <button className="card-btn" onClick={editExpanse} >Edit</button>

                            )
                            }


                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}