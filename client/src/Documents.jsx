import React, { useState } from 'react';
import { Table } from 'antd';

function Documents() {
    const [table1Data, setTable1Data] = useState([]);
    const [table2Data, setTable2Data] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showTables, setShowTables] = useState(false);
    const [showTable1, setShowTable1] = useState(false);
    const [showTable2, setShowTable2] = useState(false);

    // Example columns for table1 and table2, adjust based on your actual data structure
    const table1Columns = [
      {
          title: 'Filename',
          dataIndex: 'filename',
          key: 'filename',
      },
      {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
      },
  ];

    const table2Columns = [
      {
          title: 'Filetype',
          dataIndex: 'filetype',
          key: 'filetype',
      },
      {
          title: 'Count',
          dataIndex: 'count',
          key: 'count',
      },
  ];

    const parseAndTransformTable1 = (table1Json) => {
      const parsedTable1 = JSON.parse(table1Json);
      const { filename, filetype } = parsedTable1;
    
      // Transform into an array of objects for the table
      const transformedData = Object.keys(filename).map(index => ({
        key: index, // React keys for rendering lists
        filename: filename[index],
        category: filetype[index],
      }));
    
      return transformedData;
    };

    const parseAndTransformTable2 = (table2Json) => {
      const parsedTable2 = JSON.parse(table2Json);
      const { filetype, count } = parsedTable2;
    
      // Transform into an array of objects for the table
      const transformedData = Object.keys(filetype).map(index => ({
        key: index, // React keys for rendering lists
        filetype: filetype[index],
        count: count[index],
      }));
    
      return transformedData;
    };

    const requestData = async (command) => {
      setLoading(true);
      setShowTable1(false);
      setShowTable2(false);
      try {
        const response = await fetch('https://app.improvize.com/loan', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ question: command, name: "Sanchez" })
        });
    
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        // Check and parse table1 if it exists and is not an empty object
        if (jsonResponse.table1 && Object.keys(jsonResponse.table1).length > 0) {
          const transformedTable1Data = parseAndTransformTable1(jsonResponse.table1);
          setTable1Data(transformedTable1Data);
          setShowTable1(true); // Control the rendering of table1
        }
    
        // Check and parse table2 if it exists and is not an empty object
        if (jsonResponse.table2 && Object.keys(jsonResponse.table2).length > 0) {
          const transformedTable2Data = parseAndTransformTable2(jsonResponse.table2);
          setTable2Data(transformedTable2Data);
          setShowTable2(true); // Control the rendering of table2
        }
    
      } catch (error) {
        console.error('failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DOCUMENTS</h3>
            </div>

            <div className='main-cards'>
                <div className='card' onClick={() => requestData("files")}>
                    <div className='card-inner'>
                        <h3>FILES</h3>
                    </div>  
                </div>
                <div className='card' onClick={() => requestData("data")}>
                    <div className='card-inner'>
                        <h3>DATA</h3>
                    </div>  
                </div>
                <div className='card' onClick={() => requestData("project")}>
                    <div className='card-inner'>
                        <h3>PROJECT</h3>
                    </div>  
                </div>
            </div>
            {showTable1 && (
                <div>
                  <h2>Table 1</h2>
                  <Table columns={table1Columns} dataSource={table1Data} loading={loading} rowKey="key" />
                </div>
              )}
              {showTable2 && (
                <div>
                  <h2>Table 2</h2>
                  <Table columns={table2Columns} dataSource={table2Data} loading={loading} rowKey="key" />
                </div>
            )}
        </main>
    );
}

export default Documents;