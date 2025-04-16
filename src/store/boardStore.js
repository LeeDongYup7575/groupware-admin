import { create } from 'zustand';
import api from '../services/api';

const useBoardStore = create((set, get) => ({
    boards: [],
    isLoading: false,
    error: null,

    currentPage: 1,
    pageSize: 10,

    fetchBoards: async () => {
        set({ isLoading: true, error: null });
        try {
            const boards = await api.getBoardList();
            set({ boards, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error.response?.data?.message ||
                    error.message ||
                    '게시판 목록 불러오기 중 오류',
            });
        }
    },

    toggleBoardStatus: async (id, currentStatus) => {
        set({ isLoading: true, error: null });
        try {
            await api.updateBoardStatus(id, !currentStatus);
            const updatedBoards = get().boards.map((board) =>
                board.id === id ? { ...board, enabled: !currentStatus } : board
            );
            set({ boards: updatedBoards, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error.response?.data?.message ||
                    error.message ||
                    '게시판 상태 변경 중 오류',
            });
        }
    },

    setPage: (page) => set({ currentPage: page }),
}));

export default useBoardStore;
