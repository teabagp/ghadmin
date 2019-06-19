import React, {Component} from 'react';
import dateFormat from 'dateformat';
import * as PropTypes from 'prop-types';
import {
    Grid,
    Table,
    TableHeaderRow,
    SearchPanel,
    Toolbar,
    TableFilterRow,
    TableFixedColumns,
    TableEditRow,
    TableEditColumn,
  } from '@devexpress/dx-react-grid-material-ui';

  import { withStyles } from '@material-ui/core/styles';

  import {
    SortingState,
    IntegratedSorting,
    FilteringState,
    EditingState,
    IntegratedFiltering,
    DataTypeProvider,
    SearchState
  } from '@devexpress/dx-react-grid';

  import MenuItem from '@material-ui/core/MenuItem';
  import Select from '@material-ui/core/Select';
  import Input from '@material-ui/core/Input';
  import TextField from '@material-ui/core/TextField';

  const styles = {
    numericInput: {
      textAlign: 'right',
      width: '100%',
    },
  };


const getColorOfCell = (value) => {
    if (value <= 3) {
        return '#ff000091';
    }
    if (value <= 6 && value > 3) {
        return 'rgba(232, 145, 41, 0.67)';
    }
    return 'rgba(59, 234, 144, 0.77)';
};

const CurrencyEditorBase = ({ value, onValueChange, classes }) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() === '') {
        onValueChange();
        return;
      }
      onValueChange(parseInt(targetValue, 10));
    };
    return (
      <Input
        type="number"
        classes={{
          input: classes.numericInput,
        }}
        fullWidth
        value={value === undefined ? '' : value}
        inputProps={{
          min: 0,
          placeholder: 'Filter...',
        }}
        onChange={handleChange}
      />
    );
  };


  const birthdayEditorBase = ({ value, onValueChange, classes }) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() === '') {
        onValueChange();
        return;
      }
      onValueChange(parseInt(targetValue, 10));
    };
   
    return (
      <TextField
        type="date"
        value={value === undefined ? '' : value}
        onChange={handleChange}
      />
    );
  };

//   const birthdayFormatter = ({ value }) => >;
  
  CurrencyEditorBase.propTypes = {
    value: PropTypes.number,
    onValueChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };
  
  CurrencyEditorBase.defaultProps = {
    value: undefined,
  };


  

const HighlightedCell = ({ value, style, ...restProps }) => (
    <Table.Cell
        {...restProps}
        style={{
        backgroundColor: getColorOfCell(value),
        ...style,
        }}
    >
        <span>
        {value}
        </span>
    </Table.Cell>
);

const Cell = (props) => {
    const { column } = props;
    if (column.name === 'lessons') {
        return <HighlightedCell {...props} />;
    }
   

    return <Table.Cell {...props} />;
};

const languages = [ "English", "German", "Japanese", "Chinese", "Italian", "Spanish", "French" ];

const LanguageEditor = ({ value, onValueChange }) => (
    <Select
        input={<Input />}
        value={value ? value : 'All'}
        onChange={event => onValueChange(event.target.value)}
        style={{ width: '100%' }}
    >
        <MenuItem value="">
            All
        </MenuItem>
        {languages.map((language) => (
            <MenuItem value={language}>
                {language}
            </MenuItem>
        ))}
  </Select>
);

const LanguageTypeProvider = props => (
    <DataTypeProvider
        editorComponent={LanguageEditor}
        {...props}
    />
);

const lessonEditor = ({ value, onValueChange, classes }) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() === '') {
        onValueChange();
        return;
      }
      onValueChange(parseInt(targetValue, 10));
    };
    return (
      <Input
        type="number"
        fullWidth
        value={value === undefined ? '' : value}
        inputProps={{
          min: 0,
          placeholder: 'Filter...',
        }}
        onChange={handleChange}
      />
    );
  };

  const FilterIcon = ({ type, ...restProps }) => {
    
    if(type !== 'contains') {
        return <TableFilterRow.Icon type={type} {...restProps} />;
    }
    return <div></div>
  };

  const FilterRow = (restProps ) => {
      
    return <TableFilterRow.Editor {...restProps}/>
  };

class User extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            users: [{name: "vas"}],
            rows: [],
            validation: true,
            columns: [
                { name: 'name', title: 'Name' },
                { name: 'surname', title: 'Surname' },
                { name: 'birthday', title: 'Birthday' },
                { name: 'lessons', title: 'Lessons' },
                { name: 'phone', title: 'Phone'},
                { name: 'language', title: 'Language' },
                { name: 'work', title: 'Work' }
            ],
            loading: true,
            lessonColumn: ['lessons'],
            languageColumn: ['language'],
            birthdayColumn: ['birthday'],
            columnExtensionsFilter: [ {columnName: 'name', filteringEnabled: false}],
            leftColumns: ['editing', 'name', 'surname', 'lessons', 'language'],
            lessonFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],
            filteringColumnExtensions: [
                {
                  columnName: 'saleDate',
                  predicate: (value, filter, row) => {
                    if (!filter.value.length) return true;
                    if (filter && filter.operation === 'month') {
                      const month = parseInt(value.split('-')[1], 10);
                      return month === parseInt(filter.value, 10);
                    }
                    return IntegratedFiltering.defaultPredicate(value, filter, row);
                  },
                },
              ]
        };
        this.commitChanges = this.commitChanges.bind(this);
        this.changeSearchValue = value => this.setState({ searchValue: value });
    }

    componentDidMount() {
        this.getData();
    }
    getData() {
        fetch("http://localhost:1234/customers")
        .then((res) => res.json())
        .then(users => {
            const preparedData = users.map((user) => {
                user.birthday = this.formatDate(user.birthday);
                return user;
            });
            this.setState({ users: preparedData })
        });
    }
    formatDate(str) {
        const date = new Date(str);
        return dateFormat(date, 'yyyy-mm-dd');
    }
    addNewUser(data) {
        fetch("http://localhost:1234/customers", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            this.setState({ users: [...this.state.users, ...data] });
        });
    }
    
    // convertDateFormat(str) {
        
    // }

    updateUser(data) {
        let { users } = this.state;
        for(let key in data) {
            const user = users[key];
            // if ('birthday' in data[key]) {
            //     data[key].birthday = convertDateFormat(data[key].birthday)
            // }
            
            if(user) {
                fetch(`http://localhost:1234/customers/${user.idcustomers}`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data[key])
                }).then(() => {
                    const updatedData = Object.assign(users[key], data[key]);
                    users[key] = updatedData;
                    this.setState({ users: [...users] });
                });
            }
        }
    }

    deleteUser(data) {
        const { users } = this.state;
        const removingUser = users[data[0]];
        if(removingUser) {
            console.log(`http://localhost:1234/customers/${removingUser.idcustomers}`);
            fetch(`http://localhost:1234/customers/${removingUser.idcustomers}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: removingUser.idcustomers }) 
            }).then(() => {
                delete users[data[0]];
                this.setState({ users: [...users] });
            });
        }
    }

    commitChanges({ added, changed, deleted }) {
        if(added) {
            this.addNewUser(added);
        } else if(changed) {
            this.updateUser(changed);
        } else if (deleted) {
            this.updateUser(deleted);
        }
    }

    render() {
        return (
            <div>
                <Grid
                    rows={this.state.users}
                    columns={this.state.columns}
                >
                    <SearchState defaultValue="" />
                    <SortingState
                        defaultSorting={[{ columnName: 'lessons', direction: 'asc' }]}
                    />
                    <FilteringState  defaultFilters={[]} />
                    <IntegratedFiltering />
                    <Toolbar />
                    
                    <EditingState
                        onCommitChanges={this.commitChanges}
                    />
                    <IntegratedSorting/>
                    <Table
                        cellComponent={Cell}
                    />
                    <LanguageTypeProvider
                        for={this.state.languageColumn}
                    />
                    <DataTypeProvider 
                        for={this.state.lessonColumn}
                        availableFilterOperations={this.state.lessonFilterOperations}
                        editorComponent={lessonEditor} />

                    <DataTypeProvider 
                        for={this.state.birthdayColumn}
                        // formatterComponent={birthdayFormatter}
                        editorComponent={birthdayEditorBase} />
                    <TableHeaderRow showSortingControls/>
                    <TableEditRow />
                    <SearchPanel />
                    <TableFilterRow
                        showFilterSelector
                        editorComponent={FilterRow}
                        iconComponent={FilterIcon}
                    />
                    
                    <TableEditColumn
                        showAddCommand
                        showEditCommand
                        showDeleteCommand
                    />
                    <TableFixedColumns
                        leftColumns={this.state.leftColumns}
                    />
                </Grid>
            </div>
        )
    }
}
 
export default User;