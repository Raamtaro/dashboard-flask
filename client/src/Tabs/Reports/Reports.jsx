import React, {useState, useEffect} from 'react';
import { Progress, Card, Row, Col } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Reports.css';
// import { useEffect, useState } from 'react';

function Reports() {
    const [chartWidth, setChartWidth] = useState(400);

    const timeSavedData = [
        { name: 'Monday', WithoutDashboard: 8, WithDashboard: 5 },
        { name: 'Tuesday', WithoutDashboard: 7, WithDashboard: 4 },
        { name: 'Wednesday', WithoutDashboard: 6, WithDashboard: 3 },
        { name: 'Thursday', WithoutDashboard: 7, WithDashboard: 4 },
        { name: 'Friday', WithoutDashboard: 8, WithDashboard: 5 },
        // Add more days if needed
    ];

    // Effect to update chart width on window resize
    useEffect(() => {
        const handleResize = () => {
            // Set the chart width to be 100% of the container minus some padding
            const containerWidth = document.querySelector('.charts').offsetWidth;
            const size = Math.min(400, containerWidth - 32); // 32px for padding
            setChartWidth(size);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call the resize function to set the initial size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const pieDocData = [
        { name: 'W-2s', value: 2400 },
        { name: 'Bank', value: 4567 },
        { name: 'Income', value: 5672 },
        { name: 'Loans', value: 7566 },
        // More data...
    ];
    const pieApplicantData = [
        { name: 'Eligible', value: 2400 },
        { name: 'Rejected', value: 4567 },
        { name: 'Pending', value: 5672 },
        { name: 'Irregular', value: 7566 },
        // More data...
    ];

    const progressData = [
        { label: 'Loan Applications Complete', value: 70 },
        { label: 'All Loans in Progress', value: 40 },
        { label: 'Overall Fraud prevention', value: 99},
        { label: 'QC Red/Yellow Flags', value: 10 },
        // ... other progress data
    ];
    const gaugeData = [
        {
            name: 'Time Saved',
            uv: 31.47,
            pv: 2400,
            fill: '#8884d8',
        },
        // You can add more rings to the gauge if needed
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



    return (
        <div className="main-container">
            <div className="main-title">
                <h3>PERFORMANCE METRICS</h3>
            </div>
            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>OVERALL METRICS</h3>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>INDIVIDUAL METRICS</h3>
                    </div>
                </div>
            </div>
            <Row gutter={[16, 16]}>
                {/* Progress Bars Column */}
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    {progressData.map((item, index) => (
                        <Card key={index} title={item.label}>
                            <Progress percent={item.value}
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }} />
                        </Card>
                    ))}
                </Col>
                {/* Pie Chart Column */}
                <Col xs={24} sm={24} md={8} lg={8} xl={8} className="scrollable-column">
                    <div className="charts">
                        <Card title="Document Spread" className="pie-chart-card">
                            <PieChart width={chartWidth} height={chartWidth}>
                                <Pie
                                    data={pieDocData}
                                    cx={chartWidth/2}
                                    cy={chartWidth/2}
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieDocData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </Card>
                        <Card title="Applicant Categories" className="pie-chart-card">
                            <PieChart width={chartWidth} height={chartWidth}>
                                <Pie
                                    data={pieApplicantData}
                                    cx={chartWidth/2}
                                    cy={chartWidth/2}
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieApplicantData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </Card>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} className="scrollable-column">
                    <Card title="Time Saved" className="time-saved-card">
                        <BarChart
                            width={chartWidth}
                            height={300}
                            data={timeSavedData}
                            margin={{
                                top: 20, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="WithoutDashboard" fill="#8884d8" />
                            <Bar dataKey="WithDashboard" fill="#82ca9d" />
                        </BarChart>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Reports;
