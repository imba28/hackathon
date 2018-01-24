window.onload = () => {
    fetchUser(1);

    document.getElementById('loadUser').addEventListener('keypress', function(e) {
        if(e.charCode === 13 || e.keyCode == 13) {
            fetchUser(this.value);
        }
    });
}

function fetchUser(uid) {
    const requestsArray = [
        `http://localhost:3000/users/${uid}.json`,
        `http://localhost:3000/users/${uid}/tasks.json`
    ];

    Promise.all(requestsArray.map((request) => {
        return fetch(request).then((response) => {
            if(response.status !== 200) throw new Error('FEHLER');
            return response.json();
        });
    })).then((data) => {
        const [user, tasks] = data;
        document.getElementById('user').innerHTML = user.name;

        appendToList('tasks', tasks, (task) => {
            const group = user.groups.find(function(g) {
                return g.id == task.group_id;
            });
            return `<h4>${group.name}: ${task.name}</h4><blockquote>${task.description}</blockquote>${task.due_date ? `<p>Bis zum ${parseDate(task.due_date)}</p>` : ''}`;
        });
        appendToList('groups', user.groups, (group) => `<h4>${group.name}</h4>`);
    }).catch((err) => {
        document.getElementById('errors').appendChild(document.createTextNode(err));
    });
}

function parseDate(date) {
    const d = new Date(date);
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('.');
}

function appendToList(elem, data, render) {
    const list = document.getElementById(elem);
    while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
    }

    if(list) {
        for(let item of data) {
            const li = document.createElement('li');
            li.innerHTML = render(item);
            list.appendChild(li)
        }
    }
}