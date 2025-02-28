const Content = ({contents}) => (
    contents.map(content => <p>{content.part} {content.exercises}</p>)
)

export default Content