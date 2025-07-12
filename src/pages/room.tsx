import { Navigate, useParams } from 'react-router-dom';
import type { RoomParams } from '@/types/room-params.type';

export function Room() {
    const params = useParams<RoomParams>();

    if (!params.roomId) {
        return <Navigate replace to="/" />;
    }

    return <div>Room Details: {JSON.stringify(params)}</div>;
}
