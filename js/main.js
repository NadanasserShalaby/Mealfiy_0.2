var WebsiteName = document.getElementById("WebsiteName");
var WebsiteURL = document.getElementById("WebsiteURL");
var WebsiteContainer = [];

if (localStorage.getItem("web") !== null) {
    WebsiteContainer = JSON.parse(localStorage.getItem("web"));
    display();
}
function Submit() {
    var same_name_entered = false;
    // Perform validation checks
    demo(WebsiteName.value); // Validate the Website Name
    demo2(WebsiteURL.value); // Validate the Website URL
    // Check if both fields are valid before proceeding
    if (WebsiteName.classList.contains("is-valid") && WebsiteURL.classList.contains("is-valid")) {
        var Website = {
            name: WebsiteName.value,
            url: WebsiteURL.value
        };
        for (var iterate = 0; iterate < WebsiteContainer.length; iterate++) {
            if (WebsiteContainer[iterate].name == Website.name) {
                same_name_entered = true;
            }
        }
        if (same_name_entered == true) {
            alert("You Enter the same Name");
        }
        else {
            WebsiteContainer.push(Website);
            console.log(WebsiteContainer);
            // Save to localStorage
            localStorage.setItem("web", JSON.stringify(WebsiteContainer));
            // Update the displayed list
            display();
            // Clear the form fields
            clearForm();
        }
    } else {
        // console.log("%cSite Name or Url is not valid,\n\tPlease follow the rules below:\n\tSite name must contain at least 3 characters.\n\tSite URL must be a valid one.", "font-weight: bold; font-style: italic; color: red;");

        // alert("Site Name or Url is not valid,\n\tPlease follow the rules below Site name must contain at least 3 characters \n\tSite URL must be a valid one");
        alert("Site Name or Url is not valid, \n\tPlease follow the rules below: \n\t\tSite name must contain at least 4 characters.\n\t\tSite URL must be a valid one.");
    }
}
function clearForm() {
    WebsiteName.value = null;
    WebsiteURL.value = null;
}
function display() {
    var addWeb = '';
    for (var i = 0; i < WebsiteContainer.length; i++) {
        addWeb += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${WebsiteContainer[i].name}</td>
            <td>
                <style>
                .hover-effect-1 {
                    color: white;
                    background-color:rgb(158,178,59) ;
                    transition: all 0.3s ease;
                }

                .hover-effect-1:hover {
                    color :rgb(63, 60, 60);
                    background-color: rgba(158,178,59,0.868) ;
                }
                </style>
                <a href="${WebsiteContainer[i].url}" target="_blank" class="btn px-3 hover-effect-1" >
                    <i class="fa-solid fa-eye pe-2"></i>
                    Visit
                </a>
            </td>
            <td>
                <style>
                    .hover-effect {
                        color: white;
                        background-color:#D1512D ;
                        transition: all 0.3s ease;
                    }

                    .hover-effect:hover {
                        color :rgb(63, 60, 60);
                        background-color: rgba(209, 81, 45, 0.868);
                    }
                </style>
                <button class="btn hover-effect px-3" onclick="deleteWeb(${i})" >
                    <i class="fa-solid fa-trash pe-2"></i>
                    Delete
                </button>
            </td>
        </tr>
        `
    }
    document.getElementById("rowBody").innerHTML = addWeb;
}
function deleteWeb(index) {
    WebsiteContainer.splice(index, 1);
    display();
    localStorage.setItem("web", JSON.stringify(WebsiteContainer));
}

var pNameRegex = /^[a-zA-Z]{4,8}/;
function demo(pvalue) {
    if (pNameRegex.test(pvalue)) {
        WebsiteName.classList.add("is-valid");
        WebsiteName.classList.remove("is-invalid");
    }
    else {
        WebsiteName.classList.add("is-invalid");
        WebsiteName.classList.remove("is-valid");
    }
}
var pNameRegex_2 = /^(HTTPS:\/\/) | (https:\/\/)/;
function demo2(pvalue) {
    if (pNameRegex_2.test(pvalue)) {
        WebsiteURL.classList.add("is-valid");
        WebsiteURL.classList.remove("is-invalid");
    }
    else {
        WebsiteURL.classList.add("is-invalid");
        WebsiteURL.classList.remove("is-valid");
    }
}