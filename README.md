# calculator

This project is a complete, working calculator app built to handle basic math and more complex problems. It has a clean, responsive look that works well on phones and computers.

Main Features --------
The calculator is reliable and easy to use.

Smart Math Solver: It can solve complicated math problems that use parentheses and follow the correct order of operations (like multiplying before adding). It does this using a smart technique in JavaScript.

Works with any Keyboard: User can type numbers and hit the Enter key to calculate, just like on a regular desktop calculator.

Smooth Feel: Every time user clicks a button, a small animation happens using GSAP (GreenSock) to make the app feel quick and responsive.

Looks Good Anywhere: The design uses Tailwind CSS to look clean and modern, and it adjusts perfectly to fit any screen size, from small phones to large desktops.

Error Messages: If user tries to do something impossible, like dividing by zero or forgetting a parenthesis, the calculator will show a clear "Error" message.

Technologies Used	and their purpose ----------
HTML5	Builds the basic structure, like the screen and the buttons.
JavaScript	Handles all the math, the button clicks, the keyboard inputs, and makes the calculator work.
Tailwind CSS	Styles the whole app, giving it a modern, adaptable look.
GSAP (GreenSock) Adds the fast, simple animations to the buttons.

How the Math Works -------------
The calculator's smart feature is in the calculate function. To solve problems correctly, it first takes the normal math expression user types (like 2+3×4) and turns it into a special format called Reverse Polish Notation. It then solves the problem using a simple stacking method, which guarantees the final answer is mathematically correct every time.
