import React from 'react'

const Steps = ({ count = 0 }) => {
    let content = [...Array(count)]
    .map((i) => <div className="step" key={i + 1}>{i + 1}</div>)

    return (
        <div className="steps">
            {content}
        </div>
    )
}

export default Steps