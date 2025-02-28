import Header from "./components/Header.jsx";
import Content from "./components/Content.jsx";
import Total from "./components/Total.jsx";

const App = () => {
    const course = 'Half Stack application development'
    const contents = [
        {
            part: 'Fundamentals of React',
            exercises: 10
        },
        {
            part: 'Using props to pass data',
            exercises: 7
        },
        {
            part: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header course={course} />
            <Content contents={contents} />
            <Total exercises={contents.reduce((acc, {exercises}) => acc + exercises, 0)} />
        </div>
    )
}

export default App