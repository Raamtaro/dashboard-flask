import React, { useState,useEffect } from 'react';
import { Table, Spin } from 'antd';
import Dropdown from './Dropdown';
import { ResponsiveContainer } from 'recharts';

function Documents() {
    const [table1Data, setTable1Data] = useState([]);
    const [table2Data, setTable2Data] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [showTable1, setShowTable1] = useState(false);
    const [showTable2, setShowTable2] = useState(false);

    const [table1Columns, setTable1Columns] = useState([]);
    const [table2Columns, setTable2Columns] = useState([]);

    const [answerHeader, setAnswerHeader] = useState();

    useEffect(() => {
      const defaultSetup = async () => {
        setLoading(true);
        try {
          const response = await fetch('https://app.improvize.com/loan', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({question:"project Sanchez"})

          });
          const jsonResponse = await response.json();
          // console.log(jsonResponse)
        } catch(error) {
          console.error('failed to fetch data:', error);
        } finally {
          setLoading(false)
        }
      }
      defaultSetup()
    }, []);

    
    const commandConfig = {
      files: {
        parser1: (table1Json) => {

          const parsedTable1 = JSON.parse(table1Json);
          const { filename, filetype } = parsedTable1;
        
          
          const transformedData = Object.keys(filename).map(index => ({
            key: index, 
            filename: filename[index],
            category: filetype[index],
          }));
    
          return transformedData;

        }, 
        parser2: (table2Json) => {
          const parsedTable2 = JSON.parse(table2Json);
          const { filetype, count } = parsedTable2;
        
          
          const transformedData = Object.keys(filetype).map(index => ({
            key: index, 
            filetype: filetype[index],
            count: count[index],
          }));

          return transformedData;
        },
        columns1: [
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
        ],
        columns2: [
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
        ],
      },

      data: {
        parser1: (table1Json) => {
          const parsedTable1 = JSON.parse(table1Json);
          const { name, date } = parsedTable1;
        
          
          const transformedData = Object.keys(name).map(index => ({
            key: index, 
            name: name[index],
            date: date ? date[index] : '',
          }));
    
          return transformedData;
        }, 
        parser2: (table2Json) => {},
        columns1: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
          },
          
        ],
        columns2: []
      },
    };


    const requestData = async (command) => {
      setLoading(true);
      setShowTable1(false);
      setShowTable2(false);
      setTable1Columns([]);
      setTable2Columns([]);
      try {
        const response = await fetch('https://app.improvize.com/loan', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ question: command})
        });
    
        const jsonResponse = await response.json();
        const config = commandConfig[command];
        setAnswerHeader(jsonResponse.answer)
        // Check and parse table1 if it exists and is not an empty object
        if (jsonResponse.table1 && Object.keys(jsonResponse.table1).length > 0) {
          // const transformedTable1Data = parseAndTransformTable1(jsonResponse.table1);
          const transformedTable1Data = config.parser1(jsonResponse.table1);
          setTable1Columns(config.columns1);
          setTable1Data(transformedTable1Data);
          setShowTable1(true); // Control the rendering of table1
        }
    
        // Check and parse table2 if it exists and is not an empty object
        if (jsonResponse.table2 && Object.keys(jsonResponse.table2).length > 0 && !(jsonResponse.table2 === '{}')) {
          // const transformedTable2Data = parseAndTransformTable2(jsonResponse.table2);
          // console.log('I am being run')
          const transformedTable2Data = config.parser2(jsonResponse.table2);
          setTable2Columns(config.columns2);
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
                <Dropdown></Dropdown>
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
                
            </div>
            {loading && (
                <div className="loading-container">
                  <Spin size="large" />
                </div>
              )}
            {showTable1 && (
                
                  <div>
                    <h2>{answerHeader}</h2>
                    <Table columns={table1Columns} dataSource={table1Data} loading={loading} rowKey="key" />
                  </div>
                
              )}
              {showTable2 && (
                
                  <div>
                    <h2>Supporting Information</h2>
                    <Table columns={table2Columns} dataSource={table2Data} loading={loading} rowKey="key" />
                  </div>
                
            )}
        </main>
    );
}

export default Documents;