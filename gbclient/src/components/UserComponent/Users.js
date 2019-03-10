import React, {Component} from 'react';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
  } from '@devexpress/dx-react-grid-material-ui';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            users: [{name: "vas"}],
            rows: [],
            columns: [
                { name: 'name', title: 'Name' },
                { name: 'surname', title: 'Surname' },
                { name: 'patronym', title: 'Patronym' },
                { name: 'birthday', title: 'Birthday' },
                { name: 'email', title: 'Email' },
                { name: 'lessons', title: 'Lessons' },
            ],
            loading: true
        };

    }

    componentDidMount() {
        fetch("http://localhost:1234/users")
        .then((res) => res.json())
        .then(users => {
            this.setState({ users })
        })
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <Grid
                    rows={this.state.users}
                    columns={this.state.columns}
                >
                    <Table />
                    <TableHeaderRow />
                </Grid>
            </div>
        )
    }
}
 
export default User;