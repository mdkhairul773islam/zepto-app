import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

import rootReducers from '../redux/rootReducers'

const initialSate = {}

/* window.process = { ...window.process }; use for error  React Uncaught ReferenceError: process is not defined*/
export const store = createStore(
    rootReducers,
    initialSate,
    composeWithDevTools(applyMiddleware(logger, thunk))

)
