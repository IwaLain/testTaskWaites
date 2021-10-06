const { Component } = require('react')

class UsersGrid extends Component {
    render() {
        const userList = this.props.list.map((user) => 
        <div className="userCard" key={user._id}>
        <img src={user.avatarUrl} alt="Oops.."></img>
        <div>
            <h4>{user.name}</h4>
            <p>Телефон: {user.phone}</p>
            <p>Почта: {user.email}</p>
            <p>Дата рождения: {user.birthday}</p>
        </div>
    </div>
        )

        return (
            <div className="usersGrid">{userList}</div>
        )
    }
}

export default UsersGrid