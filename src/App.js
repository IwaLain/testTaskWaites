import './App.css'
import React, { Component } from 'react'
import axios from 'axios'
import UsersGrid from './components/UsersGrid'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: null,
      loading: false,
      value: '',
      skip: 0
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
      const res = await axios(
      `http://localhost:25565/api/users/?searchTerm=&limit=9`
      )
      const users = res.data

      this.setState({ users, loading: false, skip: users.length })
  }

  search = async val => {
    this.setState({ loading: true })
    const res = await axios(
      `http://localhost:25565/api/users/?searchTerm=${val}&limit=9`
    )
    const users = res.data

    this.setState({ users, loading: false, skip: users.length })
  }

  onChangeHandler = async e => {
    this.search(e.target.value)
    this.setState({ value: e.target.value })
  }

  get renderUsers() {
    let users = <h1>Не найдено пользователей.</h1>
    if (this.state.users) {
      if(this.state.users.length > 0) users = <UsersGrid list={this.state.users} />
      else users = <h1>Не найдено пользователей.</h1>
    }

    return users
  }

  get renderButton() {
    let button = <button className="moreUsersBtn" onClick={e => this.handleClick()}>Загрузить Дальше</button>
    if(this.state.skip % 9 !== 0 || this.state.skip === 0) button = null

    return button
  }

  handleClick = async () => {
    this.setState({ loading: true })
    const val = document.querySelector('input').value
    console.log(val)
    const res = await axios(
        `http://localhost:25565/api/users/?searchTerm=${val}&limit=9&skip=${this.state.skip}`
    )
    const users = res.data
    this.setState({ users, loading: false, skip: this.state.skip+users.length })
  }

  render() {
    return (
      <div className="App">
        <h2>Пользователи бота</h2>
        <hr></hr>
        <input
            className="searchField"
            value={this.state.value}
            onChange={e => this.onChangeHandler(e)}
            placeholder="Введите имя пользователя..."
          />
          {this.renderUsers}
          {this.renderButton}
      </div>
    )
  }
}

export default App;
