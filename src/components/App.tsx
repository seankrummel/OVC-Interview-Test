import React from 'react';
import {User, Store} from '../types';
import {connect} from 'react-redux';
import {fetchData} from '../actions';

interface Props {
  users: Array<User>;
  fetchData: any;
}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    const rows = this.props.users.map(user => (
      <tr id={user.id.toString()}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.address.city}</td>
        <td>{user.company.name}</td>
      </tr>
    ));
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Company</th>
          </tr>
          {rows}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state: Store) => ({
  users: state.users
});
export default connect(mapStateToProps, {fetchData})(App);
