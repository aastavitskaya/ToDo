export function UserItem({ user }) {
    return (
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
      </tr>
    );
  }

  export default function UsersList({ authors }) {
    return (
      <table>
        <th>First name</th>
        <th>Last Name</th>
        <th>Email</th>
        {users.map((user) => (
          <UserItem user={user} />
        ))}
      </table>
    );
  }