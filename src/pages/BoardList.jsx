import useBoardStore from "../store/boardStore";
import {useEffect, useState} from "react";
import '../styles/glassmorphism.css';

const BoardList = () => {
    const {
        boards,
        fetchBoards,
        isLoading,
        error,
        toggleBoardStatus,
        currentPage,
        pageSize,
        setPage
    } = useBoardStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');

    useEffect(() => {
        fetchBoards();
    }, []);

    const filteredBoards = boards.filter((board) =>
        board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        board.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedBoards = [...filteredBoards].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const startIndex = (currentPage - 1) * pageSize;
    const pagedBoards = sortedBoards.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(sortedBoards.length / pageSize);

    return (
        <div className="app-gradient flex-1 ml-64 p-8">
            <div className="glass-card p-6 mb-4">
                <h1 className="text-2xl font-bold text-gray-800">📋 게시판 목록</h1>
            </div>

            {/* 🔍 검색 & 정렬 */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <input
                    type="text"
                    placeholder="🔍 게시판 이름 또는 설명 검색"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(1);
                    }}
                    className="glass-input px-4 py-2 w-full md:w-1/3 rounded-lg shadow-sm text-sm placeholder:text-gray-400"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="glass-input px-3 py-2 w-full md:w-40 rounded-lg text-sm shadow-sm"
                >
                    <option value="createdAt">📅 생성일 순</option>
                    <option value="name">🔤 이름순</option>
                </select>
            </div>

            {/* 🔴 에러 */}
            {error && (
                <div className="glass-card p-4 mb-6 text-red-700 bg-red-100 border border-red-200 rounded-lg">
                    {error}
                </div>
            )}

            {/* ⏳ 로딩 */}
            {isLoading ? (
                <div className="flex justify-center items-center p-10">
                    <div className="loading-spinner"></div>
                    <span className="ml-4 text-gray-600 font-medium">불러오는 중...</span>
                </div>
            ) : pagedBoards.length === 0 ? (
                <div className="glass-card p-6 text-center text-gray-500">게시판이 없습니다.</div>
            ) : (
                <>
                    <div className="glass-table w-full">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead>
                            <tr className="text-left text-gray-600 uppercase tracking-wider text-xs">
                                <th className="px-6 py-3">제목</th>
                                <th className="px-6 py-3">설명</th>
                                <th className="px-6 py-3">생성일</th>
                                <th className="px-6 py-3">상태</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-800">
                            {pagedBoards.map((board) => (
                                <tr key={board.id} className="hover:bg-white/20 transition-all cursor-pointer">
                                    <td className="px-6 py-4">{board.name}</td>
                                    <td className="px-6 py-4">{board.description}</td>
                                    <td className="px-6 py-4">
                                        {new Date(board.createdAt).toLocaleDateString('ko-KR')}
                                    </td>
                                    <td className="px-6 py-4 flex items-center space-x-2">

                                        <button
                                            onClick={() => toggleBoardStatus(board.id, board.enabled)}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${board.enabled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {board.enabled ? '비활성화' : '활성화'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 페이지네이션 */}
                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <button
                            className="glass-btn px-4 py-1 rounded-md text-sm"
                            disabled={currentPage === 1}
                            onClick={() => setPage(currentPage - 1)}
                        >
                            ◀ 이전
                        </button>
                        <span className="text-sm text-gray-600 font-medium">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            className="glass-btn px-4 py-1 rounded-md text-sm"
                            disabled={currentPage >= totalPages}
                            onClick={() => setPage(currentPage + 1)}
                        >
                            다음 ▶
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default BoardList;
