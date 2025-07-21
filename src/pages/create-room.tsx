import { CreateRoomForm } from '@/components/ui/create-room-form';
import { RoomList } from '@/components/ui/room-list';

export function CreateRoom() {
    return (
        <div className="min-h-screen px-4 py-8">
            <div className="mx-auto max-w-4xl">
                <div className="flex w-full flex-col items-center gap-8 md:grid md:grid-cols-2 md:items-start">
                    <CreateRoomForm />
                    <RoomList />
                </div>
            </div>
        </div>
    );
}
