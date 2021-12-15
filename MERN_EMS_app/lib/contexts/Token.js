import React from 'react'

const Token = React.createContext()

class TokenProvider extends React.Component {
    state = {
        token: '',
        username: '',
        name: '',
        email: '',
    }

    setData = (token, username, name, email) => {
        this.setState({token, username, name, email})
    }

    render () {
        return (
            <Token.Provider 
                value={{
                    ...this.state,
                    setData: this.setData
                }}
            >
                {this.props.children}
            </Token.Provider>
        )
    }
}

export {Token, TokenProvider}