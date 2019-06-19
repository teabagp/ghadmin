import React, {Component} from 'react';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
  } from '@devexpress/dx-react-grid-material-ui';

import Button from '@material-ui/core/Button';
import Schedule from '../Schedule/Schedule'

const HighlightedCell = ({ value, style, ...restProps }) => (
    <Table.Cell
        {...restProps}
        style={{
        ...style,
        }}
    >
        <span>
            <Button color='primary' onClick={(e) => { console.log(this) }}>get schedule</Button>
        </span>
    </Table.Cell>
);

const Cell = (props) => {
    const { column } = props;
    if (column.name === 'idteacher') {
        return <HighlightedCell {...props} />;
    }
    return <Table.Cell {...props} />;
};

class Teacher extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            openSchedule: false,
            teachers: [{name: "vas"}],
            rows: [],
            columns: [
                { name: 'name', title: 'Name' },
                { name: 'surname', title: 'Surname' },
                { name: 'patronym', title: 'Patronym' },
                { name: 'birthday', title: 'Birthday' },
                { name: 'email', title: 'Email' },
                { name: 'phone'},
                { name: 'idteacher', title: ' '}
            ],
            loading: true
        };

    }



    componentDidMount() {
        fetch("http://localhost:1234/teachers")
        .then((res) => res.json())
        .then(teachers => {
            this.setState({ teachers })
        })
    }

    render() {
        return (
            <div>
                <h2>Teachers</h2>
                <Schedule showPopup={this.state.openSchedule} />
                <Grid
                    rows={this.state.teachers}
                    columns={this.state.columns}
                >
                    <Table
                        cellComponent={Cell}
                    />
                    <TableHeaderRow />
                </Grid>
            </div>
        )
    }
}
 
export default Teacher;