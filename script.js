const activityLink = document.getElementById("activity-link");
const activityDropdownBody = document.getElementById("activities-dropdown-body");

document.addEventListener("DOMContentLoaded", function() {
    const activityLink = document.getElementById("activity-link");
    const activityDropdownBody = document.getElementById("activities-dropdown-body");
  
    activityLink.addEventListener("click", function(event) {
        // Toggle the 'active' class to show/hide the dropdown
      activityDropdownBody.classList.toggle("active");
    });
  });


