import React, {useState, useEffect} from 'react';

import { Select, Slider, Spin } from 'antd';

function Dropdown() {
  const [loading, setLoading] = useState(false)
  const [projectNames, setProjectNames] = useState([])

  const [currentName, setCurrentName] = useState()

  useEffect(() => {
    const fetchProjectNames = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://app.improvize.com/loan', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({question: "project"})
        });
        const jsonResponse = await response.json();
        const table2Obj = JSON.parse(jsonResponse.table2);
        const projectNamesObj = table2Obj.Projects;

        const projectNamesArray = Object.values(projectNamesObj);

        console.log(projectNamesArray);

        setProjectNames(projectNamesArray);
      } catch(error) {
        console.error('failed to fetch data:', error);
      } finally {
        setLoading(false)
      }
    }
    fetchProjectNames();
  }, [])

  const handleSelectChange = async (selectedName) => {
    setLoading(true)
    setCurrentName(selectedName);
    try {
      const response = await fetch('https://app.improvize.com/loan', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ question: `project ${selectedName}`})
      });
    } catch (error) {
      console.error('failed to set project Name:', error)
    } finally {
      setLoading(false)
    }
  };

  return (

        <div className='card'>
          {loading &&(
                <div className="loading-container">
                  <Spin size="large" />
                </div>
                )}
          {!loading && (            
            <div className='card-inner'>
                <h3>{currentName ? currentName: "Please Select a Name"}</h3>
                <Select onChange={handleSelectChange} loading={loading} className='project-menu'>
                 {projectNames.map(name => (
                    <Select.Option key={name} value={name}>{name}</Select.Option>
                  ))}

                </Select>
            </div>  )}      


        </div>
    
      
        // <Select onChange={handleSelectChange} loading={loading} className='project-menu'>
        //   {projectNames.map(name => (
        //     <Select.Option key={name} value={name}>{name}</Select.Option>
        //   ))}
        // </Select>
      
         
  )
}

export default Dropdown