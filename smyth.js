const supabaseClient = supabase.createClient('https://lcyboumcokkwtaihvnox.supabase.co', 'sb_publishable_u6CrbHQYoheiiJjYvgUb4Q_vlT_zyH1');
const list = document.getElementById('room-list');
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
    const { data, error } = await supabaseClient.from('rooms').select().eq('building', 'Smyth');

    if (error) {
        console.log(error);
        return;
    }
    data.forEach(function(room) {
    
        const button = document.createElement('button');     

        button.textContent = `Room ${room.room_number}: ${room.name}`;

        button.addEventListener('click', function(){

            showRoom(room);
        })

        list.appendChild(button);

})};
loadRooms();

