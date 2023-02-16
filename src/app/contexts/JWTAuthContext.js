import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import { default_host, system_host } from "../../serviceWorker";

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

// const setSession = (accessToken) => {                                            //comment - original data saved for backup
const setSession = (accessToken, refreshToken) => {
    // if (accessToken) {                                                           //comment - original data saved for backup
    if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'FORGOTPASSWORD': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'CONFIRMPASSWORD': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    confirmPassword: () => Promise.resolve()
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (email, password) => {
        // const response = await axios.post('/api/auth/login', {           //comment - original data saved for backup
        //     email,
        //     password,
        // })
        const payLoad = {password: password, emailAddress: email};
        const response = await axios.post(`${default_host}/auth/login`, payLoad)

        // const { accessToken, user } = response.data                      //comment - original data saved for backup
        const { tokens, user } = response.data

        // setSession(accessToken)                                          //comment - original data saved for backup
        setSession(tokens.access.token, tokens.refresh.token)

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    // const register = async (email, username, password) => {              //comment - original data saved for backup
    // const register = async (email, password, role, firstName, lastName, mobileNumber, designation, organizationName) => {    //comment - previously for role
    const register = async (email, password, firstName, lastName, mobileNumber, designation, organizationName) => {
        // const response = await axios.post('/api/auth/register', {        //comment - original data saved for backup
        //     email,
        //     username,
        //     password,
        // })
        // const payLoad = {password: password, emailAddress: email, role: role, firstName: firstName, lastName: lastName, mobileNumber: (mobileNumber.toString()), designation: designation, organizationName: organizationName};      //comment - previously for role
        const payLoad = {emailAddress: email, password: password, firstName: firstName, lastName: lastName, mobileNumber: (mobileNumber.toString()), designation: designation, organizationName: organizationName};
        const response = await axios.post(`${default_host}/auth/register`, payLoad)

        // const { accessToken, user } = response.data                      //comment - original data saved for backup
        const { tokens, user } = response.data

        // setSession(accessToken)                                          //comment - original data saved for backup
        setSession(tokens.access.token, tokens.refresh.token)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    // const logout = () => {                                               //comment - original data saved for backup
    const logout = async () => {
        const payLoad = {refreshToken: localStorage.getItem("refreshToken")};
        await axios.post(`${default_host}/auth/logout`, payLoad)
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    const forgotPassword = async (email) => {
        const payLoad = {email: email, targetUrl: `${system_host}/session/`};
        await axios.post(`${default_host}/auth/forgot-password`, payLoad)
        // dispatch({ type: 'FORGOTPASSWORD' })
    }

    const confirmPassword = async (password) => {
        const payLoad = {password: password};
        await axios.post(`${default_host}/auth/reset-password`, payLoad)
        dispatch({ type: 'CONFIRMPASSWORD' })
    }

    useEffect(() => {
        ; (async () => {
            debugger;
            try {
                const accessToken = window.localStorage.getItem('accessToken')
                const refreshToken = window.localStorage.getItem('refreshToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken, refreshToken)

                    // const response = await axios.get('/api/auth/profile')        //comment - original data saved for backup
                    const response = await axios.get(`${default_host}/users/currentUser`)
                    const { user } = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
                forgotPassword,
                confirmPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
