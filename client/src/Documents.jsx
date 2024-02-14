import React, { useState, useEffect } from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'

function Documents() {
    const [data, setData] = useState([{}])
    const [loading, setLoading] = useState(false)
    const requestFiles = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://app.improvize.com/loan', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({"question": "files"})
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        setData(jsonResponse)
      } catch (error) {
        console.error('failed to fetch data:', error);
      } finally {
        setLoading(false)
      }

    }
    const requestData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://app.improvize.com/loan', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({"question": "data"})
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        setData(jsonResponse)
      } catch (error) {
        console.error('failed to fetch data:', error);
      } finally {
        setLoading(false)
      }

    }

    const requestProject = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://app.improvize.com/loan', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({"question": "project"})
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        setData(jsonResponse)
      } catch (error) {
        console.error('failed to fetch data:', error);
      } finally {
        setLoading(false)
      }

    }


    return (
      <main className='main-container'>
      <div className='main-title'>
          <h3>DOCUMENTS</h3>
      </div>

      <div className='main-cards'>
          <div className='card' onClick={requestFiles}>
              <div className='card-inner'>
                  <h3>FILES</h3>
              </div>  
          </div>
          <div className='card'>
              <div className='card-inner' onClick={requestData}>
                  <h3>DATA</h3>
              </div>  
          </div>
          <div className='card'>
              <div className='card-inner' onClick={requestProject}>
                  <h3>PROJECT</h3>
              </div>  
          </div>
         
      </div>
      </main>
       
      )




}

export default Documents