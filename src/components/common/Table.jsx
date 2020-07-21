import React,{Component} from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class Table extends Component {
    
    
    render() { 
        const { columns, data, sortColumn, onSort } = this.props;
        return (
            <table className="table table-striped">
                <TableHeader  columns={columns} sortColumn={sortColumn} onSort={onSort} />
                <TableBody data={data}  columns={columns}/>
            </table>
        )
    }
}
 
export default Table;