import { Link, useParams } from "react-router-dom"

function Survey() {
    const { questionNumber } = useParams() // hook (récupère le paramètre depuis l'URL)
    const questionNumberInt = parseInt(questionNumber) // parseInt (convertit une chaîne de caractères en nombre entier) : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
    const nextQuestionNumber = questionNumberInt + 1

    return (
        <div>
            <h1>Questionnaire</h1>
            <h2>Question {questionNumber}</h2>

            <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
            {questionNumberInt === 10 ? (
                <Link to="/results">Résultats</Link>
            ) : (
                <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
            )}
        </div>
    )
}

export default Survey