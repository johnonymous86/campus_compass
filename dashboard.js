const adminSection = document.getElementById('admin-section');
const editForm = document.getElementById('edit-form');
const editName = document.getElementById('edit-name');
const editNumber = document.getElementById('edit-number');
const editMessage = document.getElementById('edit-message');
const buildingSelect = document.getElementById('building-select');
const departmentSelect = document.getElementById('department-select');
const employeeSelect = document.getElementById('employee-select');
const roomSelect = document.getElementById('room-select');
let editingID = null;
let allRooms = [];

const lowerSelects = [
{ select: departmentSelect, category: 'department', placeholder:'Select a department' },
{ select: employeeSelect, category: 'employee', placeholder: 'Select an employee' },
{ select: roomSelect, category: 'room', placeholder: 'Select a room' }
];

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

    };

        const buildings = [...new Set(
            data.map(function(room) { return room.building; }).filter(Boolean)
        )];
    
       buildings.forEach(function(building) {
    
        addLink(buildingList, building, `${building.toLowerCase()}.html`);
       });
    
       const departments = data.filter(function(room) {
        return room.category === 'department';
    });
    
    departments.forEach(function(room) {
        addLink(departmentList, room.name, `${room.building.toLowerCase()}.html?room=${room.id}`);
    });
    
    const employees = data.filter(function(room) {
        return room.category === 'employee';
    });
    
    employees.forEach(function(room) {
        addLink(employeeList, room.name, `${room.building.toLowerCase()}.html?room=${room.id}`);
    });
     
     




