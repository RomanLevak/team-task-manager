import '../../styles/index.sass'
import React from 'react'
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'
import Header from './Header'
import Form from './Form'
import TaskListContainer from './TaskListContainer'

function App() {
    return (
        <Router>
            <>
                <Header />
                <Switch>
                    <Route path='/(sing-in|sing-up)/'>
                        <Form />
                    </Route>
                    <TaskListContainer />
                </Switch>
            </>
        </Router>
    )
}

export default App
