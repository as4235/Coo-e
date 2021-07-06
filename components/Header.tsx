import React, { useState } from 'react';
import { FaSort } from 'react-icons/fa';


const Header = ({ headers, onSorting }) => {

    const [sortingOrder, setSortingOrder] = useState("asc");
    const [sortingField, setSortingField] = useState("");

    const onSortingChange = field => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <thead>
            <tr>
                {headers.map(({ name, field, sortable }) => (
                    <th key={name}
                        onClick={() => sortable ? onSortingChange(field) : null}>{name != "" ? <p>{name}&nbsp;<FaSort /></p> : null}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default Header
