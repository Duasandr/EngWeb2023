exports.mainPage = function (tasks, date) {
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Task Management</title>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>Task Management</h1>
            </header>

            <div class="w3-container">
                <h2>Submissions</h2>
                <!-- Submit forms table -->
                <table class="w3-table-all">
                    <tr>
                        <th>Submit task</th><th>Register User</th>
                    </tr>

                    <!-- Submit forms -->
                    <tr>
                        <!-- Submit task form -->
                        <td>
                            <form class="w3-container" method="POST">
                                <fieldset>
                                    <legend>Task</legend>
                                    <label>Due date:</label>
                                    <input class="w3-input w3-round" type="date" name="due-date"/>
                                    <label>Who:</label>
                                    <input class="w3-input w3-round" type="text" name="who"/>
                                    <label>What:</label>
                                    <input class="w3-input w3-round" type="text" name="what"/>
                                </fieldset>
                                <br/>
                                <button class="w3-btn w3-purple w3-mb-2 " type="submit">Submit</button>
                            </form>
                        </td>
                        <!-- Submit user form -->
                        <td>
                            <form class="w3-container" method="POST">
                                <fieldset>
                                    <legend>User</legend>
                                    <label>Name:</label>
                                    <input class="w3-input w3-round" type="text" name="name"/>
                                </fieldset>
                                <br/>
                                <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                            </form>
                        </td>
                    </tr>
                </table>

                <!-- Tasks table -->
                <table class="w3-table-all">
                    <tr>
                        <th>Work in progress</th><th>Completed</th>
                    </tr>

                    <!-- Lists -->
                    <tr>
                        <!-- Unresolved tasks -->
                        <td>
                            <!-- "hidden" makes form input invisible so it can store the task new value for POST method -->
                            <ul class="w3-ul w3-hoverable">
                                ${tasks.map(task => {
                                    // If task is not completed, show it
                                    if(task.completed == false) 
                                        return `
                                    <li>
                                        <form method="POST">
                                            <input type="hidden" name="id" value="${task.id}"/>
                                            <input type="hidden" name="completed" value="true"/>
                                            <button class="w3-btn w3-green w3-round" type="submit">Done</button>
                                        </form>
                                        <p>
                                            <span class="w3-tag w3-round w3-blue">${task.who}</span>
                                            <span class="w3-tag w3-round w3-blue">${task.dueDate}</span>
                                            <span class="w3-tag w3-round w3-blue">${task.what}</span>
                                        </p>
                                    </li>
                                `}).join('')}
                            </ul>
                        </td>
                        <!-- Completed tasks -->
                        <td>
                            <ul class="w3-ul w3-hoverable">
                                ${tasks.map(task => {
                                    // If task is completed, show it
                                    if(task.completed == true)
                                        return `
                                    <li>
                                        <form method="POST">
                                            <input type="hidden" name="id" value="${task.id}"/>
                                            <input type="hidden" name="completed" value="false"/>
                                            <button class="w3-btn w3-red w3-round" type="submit">Undo</button>
                                        </form>
                                        <p>
                                            <span class="w3-tag w3-round w3-blue">${task.who}</span>
                                            <span class="w3-tag w3-round w3-blue">${task.dueDate}</span>
                                            <span class="w3-tag w3-round w3-blue">${task.what}</span>
                                        </p>
                                    </li>
                                `}).join('')}
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>

            <footer class="w3-container w3-blue">
                <h5>Generated by Tasks Server in ${date}</h5>
            </footer>
        </div>
    </body>
</html>
`
return pagHTML               
}
