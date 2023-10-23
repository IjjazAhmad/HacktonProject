// import React, { PureComponent } from 'react';
import React, { useEffect, useState } from 'react'

import { PieChart, Pie, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { UesDocContaxt } from '../../Contaxt/DocContaxt';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function LinChart() {
    const { allStd, allCourses } = UesDocContaxt()
    const [data, setDate] = useState()
    // console.log("🚀 ~ file: LinChart.js:11 ~ LinChart ~ allCourses:", allCourses)
    // console.log("🚀 ~ file: LinChart.js:11 ~ LinChart ~ allStd:", allStd)
    useEffect(() => {
        // Step 1: Filter and Group Data
        const courseGroups = allStd.reduce((acc, student) => {
            const { courseName } = student;
            acc[courseName] = (acc[courseName] || 0) + 1;
            return acc;
        }, {});

        // Step 2: Create New Objects
        const courseSummary = Object.keys(courseGroups).map((courseName) => ({
            courseName,
            totalStudent: courseGroups[courseName],
        }));
        setDate(courseSummary)
    }, [])
    console.log(data)

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-6">

                        <h3>Line Chart</h3>
                        <ResponsiveContainer height={300}>
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="courseName" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalStudent" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />

                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <h3>Pie Chart</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart width={100} height={100}>
                                <Pie
                                    dataKey="totalStudent"
                                    isAnimationActive={true}
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#846544"
                                    label
                                />

                                
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="col-12 col-md-6 col-lg-2">
                        <h3>Pie Chart</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart width={50} height={300}>
                            <Pie
                                    dataKey="totalStudent"
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={80}
                                    fill="#82ca9d"
                                />

                                
                                <Tooltip  />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
}

