document.addEventListener("DOMContentLoaded", function() {
    const todolist = JSON.parse(localStorage.getItem('todolist')) || [];
    //add(item): ฟังก์ชันนี้รับค่า item และเพิ่มลงในอาร์เรย์ todolist ที่เก็บรายการ To-Do List
    function add(item){
        todolist.push(item);
        localStorage.setItem('todolist', JSON.stringify(todolist));
    }
    
//update(): ฟังก์ชันนี้ใช้เพื่ออัปเดตรายการบน HTML โดยสร้างองค์ประกอบ 
//<tr> และ <td> สำหรับแต่ละรายการในอาร์เรย์ todolist และนำไปแสดงบนตาราง HTML
// ฟังก์ชัน update() ใช้เพื่ออัปเดตรายการบน HTML
function update() {
    // ค้นหาองค์ประกอบ tbody ที่อยู่ในตาราง
    const tbody = document.querySelector("#todo-list tbody");
    // ล้างข้อมูลที่อยู่ใน tbody
    tbody.innerHTML = "";
    // วนลูปเพื่อประมวลผลแต่ละรายการในอาร์เรย์ todolist
    for (let i = 0; i < todolist.length; i++) {
        
        const row = document.createElement("tr");// สร้างองค์ประกอบ <tr> (แถวของตาราง)

        const titleCell = document.createElement("td");// สร้างองค์ประกอบ <td> (เซลล์ของตาราง) สำหรับรายการ todo
        titleCell.textContent = todolist[i].todo;// กำหนดข้อความให้กับเซลล์นี้
        row.appendChild(titleCell);// เพิ่มเซลล์นี้ในแถวของตาราง

        const descriptionCell = document.createElement("td");// สร้างองค์ประกอบ <td> สำหรับคำอธิบาย
        descriptionCell.textContent = todolist[i].description;// กำหนดข้อความให้กับเซลล์นี้
        row.appendChild(descriptionCell);// เพิ่มเซลล์นี้ในแถวของตาราง
        
        const deadlineCell = document.createElement("td");// สร้างองค์ประกอบ <td> สำหรับกำหนดเวลา
        deadlineCell.textContent = todolist[i].deadline;// กำหนดข้อความให้กับเซลล์นี้
        row.appendChild(deadlineCell);// เพิ่มเซลล์นี้ในแถวของตาราง

        tbody.appendChild(row);// เพิ่มแถวที่มีเซลล์ในตาราง
    }
    console.log(todolist)
}
    
//จัดการกับ Event Listener ของฟอร์ม: ส่วนนี้จัดการกับการส่งฟอร์ม (submit) โดยไม่ให้หน้าเว็บรีโหลด 
//และเพิ่มข้อมูลจากฟิลด์ป้อนค่า (input field) ลงในอาร์เรย์ todolist จากนั้นอัปเดตรายการบน HTML
    const form = document.getElementById("todo-form");
    form.addEventListener("submit", function(event) {
        //เมื่อมีการส่งฟอร์ม (submit form) โค้ดนี้จะทำงานดังนี้:
        event.preventDefault();//ป้องกันการรีโหลดหน้าเว็บ (preventDefault)
        const todoInput = document.getElementById("todo");
        const todoValue = todoInput.value;//รับค่าจากฟิลด์ป้อนค่า (input field)
        const descriptionInput = document.getElementById("description");
        const descriptionValue = descriptionInput.value;//รับค่าจากฟิลด์ป้อนค่า (input field)
        const deadlineInput = document.getElementById("deadline");
        const deadlineValue = deadlineInput.value;//รับค่าจากฟิลด์ป้อนค่า (input field)

        add({todo: todoValue, description: descriptionValue, deadline: deadlineValue});//เพิ่มค่านั้นลงในอาร์เรย์ todolist
        update();//อัปเดตรายการบน HTML ด้วยฟังก์ชัน update()
        todoInput.value = "";//ล้างค่าฟิลด์ป้อนค่า (input field)
        descriptionInput.value = "";//ล้างค่าฟิลด์ป้อนค่า (input field)
        deadlineInput.value = "";//ล้างค่าฟิลด์ป้อนค่า (input field)
    });
    update();
});