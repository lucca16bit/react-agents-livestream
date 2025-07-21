import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateRoomRequest } from '@/types/create-room-request.type';
import type { CreateRoomResponse } from '@/types/create-room-response.type';
import type { GetRoomsResponse } from '@/types/room-response.type';

const API_URL = 'https://node-agents-livestream.onrender.com/api/rooms';

export function useGetRooms() {
    return useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch(API_URL);
            const json = await response.json();

            return json.data as GetRoomsResponse;
        },
    });
}

export function useCreateRooms() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateRoomRequest) => {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result: CreateRoomResponse = await response.json();

            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-rooms'] });
        },
    });
}
