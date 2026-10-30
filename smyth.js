const marker = document.getElementById('marker');
const map = marker.parentElement; //remove after logging locations
const params = new  URLSearchParams(window.location.search);
const requestedRoom = params.get('room');

function showRoom(room) {

    marker.style.left = `${room.x}%`;

            marker.style.top = `${room.y}%`;

            marker.style.display = `block`;
}

map.addEventListener('click', function(event) {
    const rect = map.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    console.log(`x: ${x.toFixed(1)}, y: ${y.toFixed(1)}`);
}); //remove after logging locations


async function loadRooms() {
    const { data, error } = await supabaseClient.from('rooms').select().eq('building', 'Smyth Hall');

    if (error) {
        console.log(error);
        return;
    }
   


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

