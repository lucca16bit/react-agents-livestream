import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateQuestionRequest } from '@/types/create-question-request.type';
import type { CreateQuestionResponse } from '@/types/create-question-response.type';
import type { GetQuestionsResponse } from '@/types/question-response.type';

const API_URL = 'http://localhost:3000/api/rooms/';

export function useGetQuestion(roomId: string) {
    return useQuery({
        queryKey: ['get-questions', roomId],
        queryFn: async () => {
            const response = await fetch(`${API_URL + roomId}/questions`);
            const json = await response.json();

            return json.data as GetQuestionsResponse;
        },
    });
}

export function useCreateQuestion(roomId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateQuestionRequest) => {
            const response = await fetch(`${API_URL + roomId}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result: CreateQuestionResponse = await response.json();

            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] });
        },
    });
}
