import Table from 'react-bootstrap/Table';

export function UserItem({ user }) {
    return (
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
      </tr>
    );
  }

  export default function UsersList({ users }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <UserItem user={user} key={user.email} />)}
            </tbody>
        </Table>
    );
  }