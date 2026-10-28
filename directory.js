const buildingList = document.getElementById('building-list')
const departmentList = document.getElementById('department-list')
const employeeList = document.getElementById('employee-list')

function addLink(listElement, text, href) {
    
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.textContent = text;
    a.href = href;
    li.appendChild(a);
    listElement.appendChild(li);

};

(async function () {

    const { data, error } = await supabaseClient.from('rooms').select().order('name');

    if (error) {
        console.log(error);
        return;
    }

    const buildings = [...new Set(data.map(function(room) { return room.building.filter(Boolean); }))];

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

departments.forEach(function(employees) {
    addLink(employeeListList, room.name, `${room.building.toLowerCase()}.html?room=${room.id}`);
});

}) ();
 