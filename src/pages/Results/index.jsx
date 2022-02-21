import { useContext } from 'react'
import { SurveyContext } from '../../utils/context'

function Results() {
  const { answers } = useContext(SurveyContext)
  console.log(answers)

  return (
    <div>
      <h1>Les Résultats sont...</h1>
    </div>
  )
}

export default Results