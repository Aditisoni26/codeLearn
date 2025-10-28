// ============ LOGIN & REGISTER ============
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showLogin = document.getElementById("showLogin");
const showRegister = document.getElementById("showRegister");
const form = document.getElementById("authForm");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existing = users.find(u => u.email === email);

        if (!existing) {
            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("user", JSON.stringify({ name, email }));
            alert("Registration successful!");
            window.location.href = "home.html";
        } else if (existing.password === password) {
            localStorage.setItem("user", JSON.stringify({ name: existing.name, email }));
            alert("Login successful!");
            window.location.href = "home.html";
        } else {
            alert("Incorrect password!");
        }
    });
}

// ============ COURSE PAGE LOADER ============
const courseData = {
    c: {
        title: "C Language Roadmap",
        roadmap: ["Basics of Programming", "Variables & Data Types", "Loops & Conditions", "Functions", "Pointers", "Structures"],
        resources: [
            { name: "Programiz - C Tutorial", url: "https://www.programiz.com/c-programming" },
            { name: "GeeksforGeeks C", url: "https://www.geeksforgeeks.org/c-programming-language/" }
        ]
    },
    cpp: {
        title: "C++ Roadmap",
        roadmap: ["OOP Concepts", "STL", "Inheritance & Polymorphism", "Templates", "File Handling"],
        resources: [
            { name: "LearnCPP", url: "https://www.learncpp.com/" },
            { name: "GFG C++", url: "https://www.geeksforgeeks.org/c-plus-plus/" }
        ]
    },
    python: {
        title: "Python Roadmap",
        roadmap: ["Syntax & Basics", "Data Structures", "OOP", "Modules", "NumPy & Pandas", "Web/AI"],
        resources: [
            { name: "Python.org", url: "https://docs.python.org/3/tutorial/" },
            { name: "W3Schools Python", url: "https://www.w3schools.com/python/" }
        ]
    },
    java: {
        title: "Java Roadmap",
        roadmap: ["Basics", "OOP", "Collections", "JDBC", "Spring Boot"],
        resources: [
            { name: "Java T Point", url: "https://www.javatpoint.com/java-tutorial" },
            { name: "GeeksforGeeks Java", url: "https://www.geeksforgeeks.org/java/" }
        ]
    }
};

// Display roadmap if course.html
const params = new URLSearchParams(window.location.search);
const courseKey = params.get("course");
if (courseKey && courseData[courseKey]) {
    const { title, roadmap, resources } = courseData[courseKey];
    document.getElementById("courseTitle").textContent = title;

    const roadmapDiv = document.getElementById("roadmap");
    roadmap.forEach((step, i) => {
        const item = document.createElement("p");
        item.textContent = `${i + 1}. ${step}`;
        roadmapDiv.appendChild(item);
    });

    const resList = document.getElementById("resources");
    resources.forEach(r => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${r.url}" target="_blank">${r.name}</a>`;
        resList.appendChild(li);
    });
}

if (showLogin) {
    showLogin.addEventListener("click", (e) => {
        e.preventDefault();
        registerForm.classList.add("d-none");
        loginForm.classList.remove("d-none");
    });
}

if (showRegister) {
    showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("d-none");
        registerForm.classList.remove("d-none");
    });
}

// Register
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.find((u) => u.email === email)) {
            alert("Email already registered! Please login.");
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! You can now log in.");

        registerForm.reset();
        registerForm.classList.add("d-none");
        loginForm.classList.remove("d-none");
    });
}

// Login
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            alert(`Welcome, ${user.name}!`);
            window.location.href = "home.html";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
}

// Logout button on other pages
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });
}

// Protect pages
const protectedPages = ["home.html", "course.html"];
const currentPage = window.location.pathname.split("/").pop();
if (protectedPages.includes(currentPage)) {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!user) {
        window.location.href = "index.html";
    }
}