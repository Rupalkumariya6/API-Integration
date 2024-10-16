import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Table = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const rowsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'https://jsonplaceholder.typicode.com/posts';
                let res = await axios.get(url);
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const filteredData = searchQuery
        ? data.filter(item => item.id.toString() === searchQuery)
        : data.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (e, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <div className="searchbar flex justify-end mx-20 my-10">
                <input
                    type="number"
                    placeholder="Search by ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2"
                />
            </div>
            <div className="relative max-h-full overflow-x-auto mx-20 my-5">
                {filteredData.length > 0 ? (
                    <>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">userId</th>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Title</th>
                                    <th scope="col" className="px-6 py-3">Body</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{item.userId}</td>
                                        <td className="px-6 py-4">{item.id}</td>
                                        <td className="px-6 py-4">{item.title}</td>
                                        <td className="px-6 py-4">{item.body}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {searchQuery === '' && (
                            <div className="flex justify-center mt-10">
                                <Pagination
                                    count={Math.ceil(data.length / rowsPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    renderItem={(item) => (
                                        <PaginationItem
                                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                            {...item}
                                        />
                                    )}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <h1 className="text-2xl text-center">No results found</h1>
                )}
            </div>
        </>
    );
};

export default Table;
