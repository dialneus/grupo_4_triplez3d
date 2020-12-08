import React from 'react';


class TableRow extends React.Component{

    render(props){
        return(
            <tbody>
                <tr>
                    <td> {this.props.name} </td>
                    <td> {this.props.description} </td>
                    <td>${this.props.price} </td>
                    <td>
                        <ul>
                            {this.props.categories.map( (element) =>
                                element ? <li> {element} </li> : ''
                            )}
                        </ul>
                    </td>
                    <td>
                        <ul>
                            {this.props.colors.map( (element) =>
                                element ? <li style={{color: element }}> {element.toUpperCase()} </li> : ''
                            )}
                        </ul>
                    </td>
                    <td> { this.props.stock } </td>
                </tr>
            </tbody>
        );
    }
}

export default TableRow