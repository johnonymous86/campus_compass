
const list = document.getElementById('room-list');
const marker = document.getElementById('gr-marker');
const params = new  URLSearchParams(window.location.search);
const requestedRoom = params.get('room');
const roomInfo = document.getElementById('room-info');


function showRoom(room) {

    marker.style.left = `${room.x}%`;

            marker.style.top = `${room.y}%`;

            marker.style.display = `block`;

            roomInfo.textContent = `${room.name} - Room ${room.room_number}`;
}  //Show location dot and display room information




async function loadRooms() {
    const { data, error } = await supabaseClient.from('rooms').select().eq('building', 'Grayson Hall');

    if (error) {
        console.log(error);
        return;
    } //pull location data
   


//specify which room to return
if (requestedRoom !==null) {

    const match = data.find(function(room) {
        return room.id === Number(requestedRoom);
    })
    if (match) {
        showRoom(match);
    }
}

};
loadRooms();

