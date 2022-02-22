import { useContext } from 'react'
import styled from 'styled-components'
import { SurveyContext } from '../../utils/context'
import { useFetch, useTheme } from '../../utils/hooks'
import { Loader, StyledLink } from '../../utils/style/Atoms'
import colors from '../../utils/style/colors'

const ResultsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60px 90px;
    padding: 30px;
    background-color: ${({ theme }) => 
        theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ResultsTitle = styled.h2`
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
    font-weight: bold;
    font-size: 28px;
    max-width: 60%;
    text-align: center;
    & > span {
        padding-left: 10px;
}
`

const DescriptionWrapper = styled.div`
    padding: 60px;
`

const JobTitle = styled.span`
    color: ${({ theme }) => 
    theme === 'light' ? colors.primary : colors.backgroundLight};
    text-transform: capitalize;
`

const JobDescription = styled.div`
    font-size: 18px;
    & > p {
        color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
        margin-block-start: 5px;
    }
    & > span {
        font-size: 20px;
    }
`

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`

function formatFetchParams(answers) {
    const answerNumber = Object.keys(answers) // Récupère les clés de l'objet answers

    return answerNumber.reduce((previousParams, answerNumber, index) => {
        const isFirstParam = index === 0
        const separator = isFirstParam ? '' : '&'

        return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
    }, '')
    
}

function Results() {
    const { theme } = useTheme()
    const { answers } = useContext(SurveyContext)
    const fetchParams = formatFetchParams(answers)

    const { data, isLoading, error } = useFetch(
        `http://localhost:8000/results?${fetchParams}`
    )

    if (error) {
        return <span>Oops il y a un problème</span>
    }

    // Ici le "?" permet de s'assurer que data existe bien.
    // Vous pouvez en apprendre davantage sur cette notation ici :
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    const resultsData = data?.resultsData

    return isLoading ? (
        <LoaderWrapper>
            <Loader />
        </LoaderWrapper>
    ) : (
        <ResultsContainer theme={theme}>
            <ResultsTitle theme={theme}>
                Les compétences dont vous avez besoin :
                {resultsData && 
                    resultsData.map((result, index) => (
                        <JobTitle
                            key={`result-title-${index}-${result.title}`}
                            theme={theme}
                        >
                            {result.title}
                            {index === resultsData.lenght - 1 ? '' : ','}
                        </JobTitle>
                    ))}
            </ResultsTitle>
            <StyledLink $isFullLink to="/freelances">
                Découvrez nos profils
            </StyledLink>
            <DescriptionWrapper>
                {resultsData &&
                    resultsData.map((result, index) => (
                        <JobDescription
                            theme={theme}
                            key={`result-detail-${index}-${result.title}`}
                        >
                            <JobTitle theme={theme}>{result.title}</JobTitle>
                            <p>{result.description}</p>
                        </JobDescription>
                    ))}
            </DescriptionWrapper>
        </ResultsContainer>
    )
}

export default Results