import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import type { GetRoomsApiResponse } from '@/types/room-response.type';

export function CreateRoom() {
    const { data, isLoading } = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/api/rooms');
            const json = await response.json();

            return json.data as GetRoomsApiResponse;
        },
    });

    return (
        <div>
            {isLoading && <p>Carregando...</p>}
            <div className="flex flex-col gap-2">
                {data?.map((room) => (
                    <Link key={room.id} to={`/room/${room.id}`}>
                        {room.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
