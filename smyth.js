const supabaseClient = supabase.createClient('https://lcyboumcokkwtaihvnox.supabase.co', 'sb_publishable_u6CrbHQYoheiiJjYvgUb4Q_vlT_zyH1');
const list = document.getElementById('room-list');
const marker = document.getElementById('marker');


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

            marker.style.left = `${room.x}%`;

            marker.style.top = `${room.y}%`;

            marker.style.display = `block`;
        })

        list.appendChild(button);

})};
loadRooms();