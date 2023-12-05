// File: DepartmentsList.tsx

import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface DepartmentData {
    department: string;
    sub_departments?: string[];
}

const departmentData: DepartmentData[] = [
    {
        "department": "customer_service",
        "sub_departments": ["support", "customer_success"]
    },
    {
        "department": "design",
        "sub_departments": ["graphic_design", "product_design", "web_design"]
    }
];

const DepartmentsList: React.FC = () => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
    const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, nodeId: string) => {
        let newSelectedNodes = [...selectedNodes];

        const department = departmentData.find((dept) => dept.department === nodeId);

        if (event.target.checked) {
            // Adding the selected node to the list
            newSelectedNodes.push(nodeId);

            // If it's a department, then slecet all its sub-departments
            if (department && Array.isArray(department.sub_departments)) {
                newSelectedNodes = [...newSelectedNodes, ...department.sub_departments];
            }

        } else {
            // Remov the selected node from the list
            const index = newSelectedNodes.indexOf(nodeId);
            if (index !== -1) {
                newSelectedNodes.splice(index, 1);
            }

            // If it's a department, deselect all its sub-departments
            if (department && Array.isArray(department.sub_departments)) {
                newSelectedNodes = newSelectedNodes.filter((node) => !department.sub_departments?.includes(node));
            }
        }

        // Handling the parent department logic here : 
        const parentDepartment = departmentData.find((dept) => dept.sub_departments?.includes(nodeId))?.department;

        if (parentDepartment) {
            const subDepartments = departmentData.find((dept) => dept.department === parentDepartment)?.sub_departments;

            if (subDepartments && subDepartments.every((subDept) => newSelectedNodes.includes(subDept))) {
                // If all sub-departments are selected,then select the parent wala department
                if (!newSelectedNodes.includes(parentDepartment)) {
                    newSelectedNodes.push(parentDepartment);
                }
            } else {
                // If not all sub-departments are selected,then deselect the parent department
                newSelectedNodes = newSelectedNodes.filter(selectedNode => selectedNode !== parentDepartment);
            }
        }

        setSelectedNodes(newSelectedNodes);
    };





    const handleToggle = (nodeId: string) => {
        setExpandedNodes((prevExpandedNodes) =>
            prevExpandedNodes.includes(nodeId)
                ? prevExpandedNodes.filter((id) => id !== nodeId)
                : [...prevExpandedNodes, nodeId]
        );
    };

    const renderTree = (nodes: DepartmentData[]) => (
        nodes.map((node) => (
            <div key={node.department}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleToggle(node.department)}
                    >
                        {expandedNodes.includes(node.department) ?  <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}

                    </div>
                    <Checkbox
                        checked={selectedNodes.includes(node.department)}
                        onChange={(e) => handleCheckboxChange(e, node.department)}
                    />
                    {node.department}
                </div>
                {expandedNodes.includes(node.department) && Array.isArray(node.sub_departments) && (
                    <div style={{ marginLeft: 20 }}>
                        {renderTree(
                            node.sub_departments.map((subDepartment) => ({ department: subDepartment }))
                        )}
                    </div>
                )}
            </div>
        ))
    );

    return (
        <div className='my-6'>
            <div className='text-center text-3xl font-semibold'>
                Deparment List
            </div>
            {renderTree(departmentData)}
        </div>
    );
};

export default DepartmentsList;
