import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

function Survey() {
  const { questionNumber } = useParams() // hook (récupère le paramètre depuis l'URL)
  const questionNumberInt = parseInt(questionNumber) // parseInt (convertit une chaîne de caractères en nombre entier) : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1

  const [surveyData, setSurveyData] = useState({})
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)

  // Cette syntaxe permet aussi bien de faire des calls API.
  // Mais pour utiliser await dans une fonction, il faut que celle-ci soit async (pour asynchrone).
  /* useEffect(() => {
    fetchData()
    setDataLoading(true)
    fetch(`http://localhost:8000/survey`).then((response) =>
      response.json().then(({ surveyData }) => {
        setSurveyData(surveyData)
        setDataLoading(false)
      })
    ) 
  }, []) */
  
  // Comme la fonction passée à useEffect ne peut pas être asynchrone,
  // il faut utiliser une fonction qui est appelée dans useEffect et déclarée en dehors, comme ici 👇.
  useEffect(() => {
    async function fetchSurvey() {
      setDataLoading(true)
      try {
        const response = await fetch(`http://localhost:8000/survey`)
        const { surveyData } = await response.json() // { surveyData } est une propriété de l'objet qui est retourné donc entre {}. Il est aussi parsé avec .json()
        setSurveyData(surveyData)
      } catch (err) {
        console.log('===== error =====', err)
        setError(true)
      } finally {
        setDataLoading(false)
      }
    }
    fetchSurvey()
  }, [])

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
      )}
      <LinkWrapper>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

export default Survey