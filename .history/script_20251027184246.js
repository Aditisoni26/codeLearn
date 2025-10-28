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
// ============ LOGIN + REGISTER COMBINED LOGIC ============


if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Fetch users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists
        const existingUser = users.find((u) => u.email === email);

        if (existingUser) {
            // LOGIN
            if (existingUser.password === password) {
                localStorage.setItem("user", JSON.stringify({ name: existingUser.name, email }));
                alert(`Welcome back, ${existingUser.name}!`);
                window.location.href = "home.html";
            } else {
                alert("Invalid password! Please try again.");
            }
        } else {
            // REGISTER
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("user", JSON.stringify({ name, email }));
            alert("Registration successful! Redirecting to home...");
            window.location.href = "home.html";
        }
    });
}