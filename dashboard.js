const list = document.getElementById('room-list');
const adminSection = document.getElementById('admin-section');
const editForm = document.getElementById('edit-form');
const editName = document.getElementById('edit-name');
const editNumber = document.getElementById('edit-number');
const editMessage = document.getElementById('edit-message');
let editingID = null;

loadRooms();

editForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    if (editingID === null) {
        editMessage.textContent = 'Select a room first';
        return;}

    const numberValue = editNumber.value.trim();
    const nameValue = editName.value.trim();
    
    const { data, error } = await supabaseClient
    .from('rooms')
    .update({ name: nameValue, room_number: numberValue })
    .eq('id', editingID)
    .select();

    if (error) {
        editMessage.textContent = 'Request Failed.';
        return;
    }

    if (data.length === 0) {
        editMessage.textContent = 'Log in again.';
        return;
    }

    editMessage.textContent = 'Saved.';

    loadRooms();
});

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

        list.textContent = '';

        data.forEach(function(room) {
    
        const button = document.createElement('button');     

        button.textContent = `Room ${room.building}: ${room.room_number} - ${room.name}`;

        button.addEventListener('click', function() {
        
        editingID = room.id;

        editName.value = room.name;

        editNumber.value = room.room_number;

        editForm.style.display = "block";

    });

        list.appendChild(button);

})};


