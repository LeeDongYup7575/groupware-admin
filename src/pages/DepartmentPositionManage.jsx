import React, { useEffect, useState } from 'react';
import '../styles/glassmorphism.css';
import apiService from "../services/api";

const DepartmentPositionManage = () => {
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);

    const [newDeptName, setNewDeptName] = useState('');
    const [selectedDeptIds, setSelectedDeptIds] = useState([]); // 멀티 선택

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [departmentResp, positionResp] = await Promise.all([
                    apiService.getManageDepartment(),
                    apiService.getManagePosition()
                ]);
                setDepartments(departmentResp);
                setPositions(positionResp);
            } catch (err) {
                console.error('부서 및 직급 목록 불러오기 오류:', err);
            }
        };

        fetchData();
    }, []);

    // 🔼 부서 추가
    const handleAddDepartment = async () => {
        if (newDeptName.trim() === '') return;
        try {
            await apiService.addDepartment(newDeptName);
            const departmentResp = await apiService.getManageDepartment();
            setDepartments(departmentResp);
            setNewDeptName('');
        } catch (err) {
            console.error('부서 추가 오류:', err);
        }
    };

    // ✅ 선택 토글
    const toggleSelect = (id) => {
        setSelectedDeptIds(prev =>
            prev.includes(id)
                ? prev.filter(deptId => deptId !== id)
                : [...prev, id]
        );
    };

    // 🔽 여러 부서 삭제
    const handleDeleteDepartments = async () => {
        if (selectedDeptIds.length === 0) return;
        const confirmed = window.confirm(`선택된 ${selectedDeptIds.length}개 부서를 삭제하시겠습니까?`);
        if (!confirmed) return;

        try {
            for (const id of selectedDeptIds) {
                await apiService.deleteDepartment(id);
            }
            const departmentResp = await apiService.getManageDepartment();
            setDepartments(departmentResp);
            setSelectedDeptIds([]);
        } catch (err) {
            console.error('부서 삭제 오류:', err);
        }
    };

    return (
        <div className="flex-1 ml-64 bg-gray-50 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">부서 및 직급 관리</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 🔷 부서 관리 */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">부서 관리</h2>

                    <ul className="mb-4 space-y-2">
                        {departments.map(dept => (
                            <li
                                key={dept.id}
                                className={`cursor-pointer px-3 py-2 rounded ${
                                    selectedDeptIds.includes(dept.id)
                                        ? 'bg-red-100 text-red-800 font-semibold'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => toggleSelect(dept.id)}
                            >
                                {dept.name}
                            </li>
                        ))}
                    </ul>

                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="새 부서명 입력"
                            value={newDeptName}
                            onChange={(e) => setNewDeptName(e.target.value)}
                            className="glass-input px-4 py-2 flex-1"
                        />
                        <button onClick={handleAddDepartment} className="glass-btn px-4 py-2">추가</button>
                    </div>

                    {selectedDeptIds.length > 0 && (
                        <div className="mt-4 text-right">
                            <button
                                onClick={handleDeleteDepartments}
                                className="glass-btn px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                선택된 부서 {selectedDeptIds.length}개 삭제
                            </button>
                        </div>
                    )}
                </div>

                {/* 🔷 직급 관리 (조회만) */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">직급 관리</h2>
                    <ul className="mb-4 space-y-2">
                        {positions.map(pos => (
                            <li key={pos.id} className="text-gray-700">{pos.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DepartmentPositionManage;
