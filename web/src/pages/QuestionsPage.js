import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {
    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    const [search, setSearch] = useState("");
    const [categorySearch, setCategorySearch] = useState("");

    var questionFilteredCategory = questions.filter(question => question.category.toUpperCase().includes(categorySearch.toUpperCase()))
    var questionsFilteredSearch = questionFilteredCategory.filter(question => question.question.toUpperCase().includes(search.toUpperCase()))

    const goToVariable = questionsFilteredSearch[0]?.id

    const handleSearch = (e)=>{
        setSearch(e.target.value);
    }

    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questionsFilteredSearch.map(question => <Question  setCategorySearch = {setCategorySearch} key={question.id} question={question} excerpt />)
    }

    return (
        <section className = "main-container">
            <form>
                <input className = "searching-bar" type = "text" onChange = { handleSearch} placeholder = "SEARCH SOME QUESTION..."/>
                <Link to = {`/question/${goToVariable}`}> <input style = {{display: "none"}} type="submit" value = "search"/> </Link>
            </form>
            <h1>Questions</h1>
            {renderQuestions()}
        </section>
    )
}
const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
})
export default connect(mapStateToProps)(QuestionsPage)