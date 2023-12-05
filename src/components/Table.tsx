import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}


const Table: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const columns: GridColDef[] = [
        { field: 'userId', headerName: 'User ID', width: 90 },
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'body', headerName: 'Body', flex: 1 },
    ];

    return (
        <div className='w-[100%] h-[80vh]'>

            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={posts}
                    columns={columns}
                    checkboxSelection
                    pageSizeOptions={[5]}
                />
            </div>
        </div>
    );
};

export default Table;
