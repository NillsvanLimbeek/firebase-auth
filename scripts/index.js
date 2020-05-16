// variables
const guidesList = document.querySelector('.guides');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');

// setup links
export function setupLinks(user) {
    if (user) {
        loggedInLinks.forEach((link) => (link.style.display = 'block'));
        loggedOutLinks.forEach((link) => (link.style.display = 'none'));
    } else {
        loggedInLinks.forEach((link) => (link.style.display = 'none'));
        loggedOutLinks.forEach((link) => (link.style.display = 'block'));
    }
}

// setup guides
export function setupGuides(docs) {
    let html = '';

    if (docs.length) {
        docs.forEach((doc) => {
            const guide = doc.data();
            const li = `
            <li>
                <div class="collapsible-header grey lighten-4">${guide.title}</div>
                <div class="collapsible-body white">${guide.description}</div>
            </li>
            `;

            html += li;
        });
    } else {
        html = `<h4 class="center-align">Please login to show the guides</h4>`;
    }

    guidesList.innerHTML = html;
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});
