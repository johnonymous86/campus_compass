const supabaseClient = supabase.createClient('https://lcyboumcokkwtaihvnox.supabase.co', 'sb_publishable_u6CrbHQYoheiiJjYvgUb4Q_vlT_zyH1');
const list = document.getElementById('room-list');
const adminSection = document.getElementById('admin-section');
const editForm = document.getElementById('edit-form');
const editName = document.getElementById('edit-name');
const editNumber = document.getElementById('edit-number');
let editingID = null;

(async function() {
    
    const {data: {session}} = await supabaseClient.auth.getSession();

    if(!session) {window.location.href = "user.html";} 
    
    else {
        adminSection.style.display = 'block';
    }


    
})

();

async function loadRooms() {
    const { data, error } = await supabaseClient.from('rooms').select().order('building');

    if (error) {
        console.log(error);
        return;
    }

    data.forEach(function(room) {
    
        const button = document.createElement('button');     

        button.textContent = `Room ${room.building}: ${room.room_number} - ${room.name}`;

        button.addEventListener('click', function() {

            console.log('clicked', room.id);
        
        editingID = room.id;

        editName.value = room.name;

        editNumber.value = room.room_number;

        editForm.style.display = "block";

    });

        list.appendChild(button);

})};

loadRooms();
