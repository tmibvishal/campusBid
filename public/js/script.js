function addANewDetailsRow(){
    let tableBody = document.getElementById("detailsTableBody");
    let tr = document.createElement("tr");
    tr.className = "alert";
    tr.innerHTML = `<th scope="row"><input class="form-control form-control-sm" type="text" placeholder="Enter Key eg:- Pages / Ram" name="technicalDetailsKey"></th>
                                            <td><input class="form-control form-control-sm" type="text" name="technicalDetailsValue" placeholder="Enter Value eg:- 200 / 4GB"></td>
                                            <td><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button></td>`
    tableBody.appendChild(tr);
}