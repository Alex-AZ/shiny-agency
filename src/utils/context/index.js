import { createContext, useState } from "react";

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
/* On a bien créé un composant qui nous permet de wrapper notre composant parent avec notre Provider de thème. 
Le state de theme et sa fonction pour le modifier, setTheme, sont passés dans les values. 
Ainsi, tous les composants enfants qui se retrouvent englobés par le Provider vont pouvoir accéder à theme  
et setTheme. */


export const SurveyContext = createContext()

export const SurveyProvider = ({ children }) => {
    const [answers, setAnswers] = useState({})
    const saveAnswers = (newAnswers) => {
        setAnswers({ ...answers, ...newAnswers })
    }

    return (
        <SurveyContext.Provider value={{ answers, saveAnswers }}>
            { children }
        </SurveyContext.Provider>
    )
} 