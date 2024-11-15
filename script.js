function loadTable() {
    fetch("php/load.php")
        .then((response) => response.json())
        .then((data) => {
            var tbody = document.getElementById("tbody");
            var tr = '';
            if (data['empty']) {
                tbody.innerHTML = `<tr><td colspan = '2' style = 'color: red;font-weight: bold;overflow: hidden; border: none; border-bottom:2px solid #ccc' align = 'center'>No Task Found</td></tr>`;
            } else {
                for (var i in data) {
                    tr += `<tr align = 'center'>
                                <td  style = 'border: none; border-bottom:2px solid #fff;'>${data[i].task}</td>
                                <td style = 'border: none; border-bottom:2px solid #fff'><button class="edit_btn" onclick="modify('${data[i].task}')">Edit</button>
                                <button class="delete_btn" onclick="complete('${data[i].task}')">Complete</button></td>
                        </tr>`;
                }
            }
            tbody.innerHTML = tr;
        })
        .catch(() => {
            alert("Can't Fetch Data");
        })
}

loadTable();

function search() {
    var searchid = document.getElementById("search").value;
    fetch("php/search.php?search=" + searchid)
        .then((response) => response.json())
        .then((data) => {
            var tbody = document.getElementById("tbody");
            var tr = '';
            if (data.empty == true) {
                tbody.innerHTML = `<tr><td colspan = '2' style = 'color: red;font-weight: bold;overflow: hidden; border: none; border-bottom:2px solid #ccc' align = 'center'>No Task Found</td></tr>`;
            } else {
                for (var i in data) {
                    tr += `<tr align = 'center'>
                            <td style = 'border: none; border-bottom:2px solid #ccc' id = 'data'>
                                ${data[i].task}
                            </td>
                            <td style = 'border: none; border-bottom:2px solid #ccc'>
                                <button class="edit_btn" onclick="modify('${data[i].task}')">Edit</button>
                                <button class="delete_btn" onclick="complete()">Complete</button>
                            </td>
                        </tr>`;
                }
            }
            tbody.innerHTML = tr;
        })
        .catch(() => {
            alert("Can't Search Data");
        })
}

function add() {
    var insert = document.getElementById("input").value;

    if (insert === '') {
        alert("Please Enter Task");
    } else {
        var task = {
            "text": insert
        }

        var jsondata = JSON.stringify(task);

        fetch("php/insert.php", {
            method: "POST",
            body: jsondata,
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.insert == 'success') {
                    alert("Task Added Successfully");
                    loadTable();
                } else {
                    alert("Task Not Added Successfully");
                    loadTable();
                }
            })
            .catch(() => {
                alert("Can't Insert Data");
                loadTable();
            })
    }
}

function modify(task) {
    document.getElementById("upd_task").value = task;
    document.getElementById("old_task").value = task;

    document.getElementById("modal").style.display = "block";

    document.getElementById("close_btn").addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
    });
}

function update() {
    const upd_task = document.getElementById("upd_task").value;
    const old_task = document.getElementById("old_task").value;

    var data = {
        "task": upd_task,
        "old_task": old_task
    }

    var jsondata = JSON.stringify(data);

    fetch("php/update.php", {
        method: "PUT",
        body: jsondata,
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.update == 'success') {
                alert("Task Updated Succeessfully");
                document.getElementById("modal").style.display = "none";
                loadTable();
            } else {
                alert("Task Not Updated Succeessfully");
                document.getElementById("modal").style.display = "none";
                loadTable();
            }
        })
        .catch(() => {
            alert("Can't Update Data");
            document.getElementById("modal").style.display = "none";
            loadTable();
        })
}

function complete(task) {
    if (confirm("Do You Really Want To Complete This Task")) {
        fetch("php/delete.php?delete=" + task, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.delete === 'success') {
                    alert("Task Completed Successfully");
                    loadTable();
                } else {
                    alert("Task Not Completed Successfully");
                }
            })
            .catch(() => {
                alert("Can't Complete Data");
                loadTable();
            })
    } else {
        alert("Completion Cancelled");
    }
}
