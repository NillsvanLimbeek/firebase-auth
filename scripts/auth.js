import { setupGuides, setupLinks } from './';

// variables
const signupModal = document.querySelector('#modal-signup');
const loginModal = document.querySelector('#modal-login');
const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
const createModal = document.querySelector('#modal-create');
const createForm = document.querySelector('#create-form');
const logoutBtn = document.querySelector('#logout');

// get data

//event listeners
// auth change
auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection('guides')
            .get()
            .then((snapshot) => {
                setupGuides(snapshot.docs);
            });
        setupLinks(user);
    } else {
        setupGuides([]);
        setupLinks();
    }
});

// signup
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then((res) => {
        M.Modal.getInstance(signupModal).close();
        signupForm.reset();
    });
});

// logout
logoutBtn.addEventListener('click', (e) => {
    auth.signOut();
});

// login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then((res) => {
        M.Modal.getInstance(loginModal).close();
        signupForm.reset();
    });
});

// create giude
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides')
        .add({
            title: createForm['title'].value,
            description: createForm['content'].value,
        })
        .then(() => {
            M.Modal.getInstance(createModal).close();
            createForm.reset();
        })
        .catch((err) => {
            console.log(err.message);
        });
});
