import React from 'react';
import './styles/allProducts.css';
import TableRow from './tableRow';

const rowContent = [
    {
        name : "Richard Nixon",
        description : "System Architect",
        price : 320800,
        categories : ['Category 01','Category 02','Category 03'],
        colors : ['red','blue','green'],
        stock : 245
    },
    {
        name : "Jane Doe",
        description : "Fullstack Developer",
        price : 220800,
        categories : ['Category 04','Category 05','Category 06'],
        colors : ['red','blue','green'],
        stock : 385
    },
    {
        name : "De Prueba",
        description : "Albañil",
        price : 220800,
        categories : ['Category 04','Category 05','Category 06'],
        colors : ['gray','violet','black'],
        stock : 385
    }
];

class AllProducts extends React.Component{

    render(){
        return(
        <div>
            <h1 className="h3 mb-2 text-gray-800">All the products in the Database</h1>    
			<div className="card shadow mb-4">
				<div className="card-body">
					<div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Categories</th>
                                    <th>Colors</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Categories</th>
                                    <th>Colors</th>
                                    <th>Stock</th>
                                </tr>
                            </tfoot>
                            {rowContent.map( (item,i) => 
                                item ? <TableRow key={i} 
                                    name={item.name} 
                                    description={item.description} 
                                    price={item.price} 
                                    categories={item.categories} 
                                    colors={item.colors}
                                    stock={item.stock}
                                    /> : ''
                            )}              
                        </table>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default AllProducts