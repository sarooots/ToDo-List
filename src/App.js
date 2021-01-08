import React from 'react'
import ToDo from './components/ToDoList/ToDo'
import './App.scss'
import classes from './components/Product/Product.module.sass'


function App() {
    // const products = [
    //     {
    //         name: 'LACALUT white',
    //         price: 1600,
    //         desc: 'Ատամները սպիտակեցնող ատամի մածուկ',
    //         currency: 'AMD'
    //     },
    //     {
    //         name: 'Շապիկ',
    //         price: 2000,
    //         desc: 'Սպիտակ շապիկ 100 տոկոսանոց բամբակյա կտորից',
    //         currency: 'AMD'
    //     },
    //     {
    //         name: '1TB HDD',
    //         price: 12000,
    //         desc: '1 տեռաբայթանոց հիշողության սարք 2,5 inch նոթբուքների համար',
    //         currency: 'AMD'
    //     },
    //     {
    //         name: 'Տաք գուլպա',
    //         price: 4500,
    //         desc: 'Մաքուր բրդից ձեռագործ տաք գուլպաներ',
    //         currency: 'AMD'
    //     }
    // ]
    //
    // const showProducts = products.map((product, index)=> {
    //     return <Product
    //         key={index}
    //         name={product.name}
    //         price={product.price}
    //         desc={product.desc}
    //         currency={product.currency}
    //     />
    // })

    return (

        <div className="App">
            <h2 className={classes.homeworkTitle}>Lesson 8-9 To do list</h2>
            <ToDo/>


            {/*<h2 className={classes.homeworkTitle}>Lesson 7, product list, change currency</h2>*/}
            {/*<table>*/}
            {/*    <tbody>*/}
            {/*    <tr>*/}
            {/*        <th className={classes.name}>Product name</th>*/}
            {/*        <th className={classes.desc}>Description</th>*/}
            {/*        <th className={classes.price}>Price</th>*/}
            {/*        <th className={classes.action}>Action</th>*/}
            {/*    </tr>*/}
            {/*    {showProducts}*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </div>
    );
}

export default App;
