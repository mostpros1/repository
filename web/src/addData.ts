import { dynamoDB } from './main.tsx';



export function addUser(username: string, email: string, password: string, first_name: string, last_name: string,
    date_of_birth: string, created_at: string, updated_at: string, status: string) {

    const params = {
        TableName: "users",
        Item: {
            id: { N: "1" },
            username: { S: username },
            email: { S: email },
            password: { S: password },
            first_name: { S: first_name },
            last_name: { S: last_name },
            date_of_birth: { S: date_of_birth },
            created_at: { S: created_at },
            updated_at: { S: updated_at },
            status: { S: status },
        }
    };

    dynamoDB.putItem(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addUser_roles(user_id: number, role: string, created_at: string, updated_at: string) {
    const params = {
        TableName: "user_roles",
        Item: {
            user_id: { N: String(user_id) },
            role: { S: role },
            created_at: { S: created_at },
            updated_at: { S: updated_at },
        }
    };

    dynamoDB.putItem(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addRoles(id: number, name: string, description: string, created_at: string, updated_at: string) {
    const params = {
        TableName: "roles",
        Item: {
            id: { N: String(id) },
            name: { S: name },
            description: { S: description },
            created_at: { S: created_at },
            updated_at: { S: updated_at },
        }
    };

    dynamoDB.putItem(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}


export function addClient(phone: number, contact_email: string, adress: string, industry: string, name: string) {

    const params = {
        TableName: "clients",
        Item: {
            id: { N: "1" },
            phone: { S: String(phone) },
            contact_email: { S: contact_email },
            adress: { S: adress },
            industry: { S: industry },
            name: { S: name },
        }
    };

    dynamoDB.putItem(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}


export function addClient_members(client_id: number, user_id: number, role: string, joined_date: Date, primary: string) {
    const param = {
        TableName: "client_members",
        Item: {
            client_id: { N: String(client_id) },
            user_id: { N: String(user_id) },
            role: { S: role },
            joined_date: { S: joined_date.toISOString() },
            primary: { S: primary },
        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addProjects(client_id: number, name: string, description: string, start_date: Date, end_date: Date, status: string) {
    const param = {
        TableName: "projects",
        Item: {
            client_id: { N: String(client_id) },
            name: { S: name },
            description: { S: description },
            start_date: { S: start_date.toISOString() },
            end_date: { S: end_date.toISOString() },
            status: { S: status },
        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addProject_members(project_id: number, user_id: number, role: string, joined_date: Date, primary: string) {
    const param = {
        TableName: "project_members",
        Item: {
            project_id: { N: String(project_id) },
            user_id: { N: String(user_id) },
            role: { S: role },
            joined_date: { S: joined_date.toISOString() },
            primary: { S: primary },
        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addInvoices(id: number, project_id: number, amount: number, issued_date: Date, due_date: Date, status: string) {
    const param = {
        TableName: "invoices",
        Item: {
            id: { N: String(id) },
            project_id: { N: String(project_id) },
            amount: { N: String(amount) },
            issued_date: { S: String(issued_date) },
            due_date: { S: String(due_date) },
            status: { S: status },
        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addInvoice_line_items(id: number, invoice_id: number, description: string, quantity: number, price: number) {
    const param = {
        TableName: "invoice_line_items",
        Item: {
            id: { N: String(id) },
            invoice_id: { N: String(invoice_id) },
            description: { S: description },
            quantity: { N: String(quantity) },
            price: { N: String(price) },
        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addPayments(id: number, invoice_id: number, amount: number, fee: number, net: number, status: string, transfer_destinstion: string, transfer: string, description: string) {
    const param = {
        TableName: "payments",
        Item: {
            id: { N: String(id) },
            invoice_id: { N: String(invoice_id) },
            amount: { N: String(amount) },
            fee: { N: String(fee) },
            net: { N: String(net) },
            status: { S: status },
            transfer_destinstion: { S: transfer_destinstion },
            transfer: { S: transfer },
            description: { S: description },

        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addProfessionals(id: number, user_id: number, email: string, postcode: string, region: string, field_of_work: string, slug: string) {
    const param = {
        TableName: "professionals",
        Item: {
            id: { N: String(id) },
            user_id: { N: String(user_id) },
            email: { S: email },
            postcode: { S: postcode },
            region: { S: region },
            field_of_work: { S: field_of_work },
            slug: { S: slug },
        }
    }

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addAvailibility(id: number, professional_id: number, job_description: string, date: Date, time_from: string, time_to: string) {
    const param = {
        TableName: "availibility",
        Item: {
            id: { N: String(id) },
            professional_id: { N: String(professional_id) },
            job_description: { S: job_description },
            date: { S: String(date) },
            time_from: { S: time_from },
            time_to: { S: time_to },
        }
    }
    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addChats(id: number, sender_id: number, reciever_id: number, message: string, sent_at: string, recieved_at: string){
    const param = {
        TableName: "chats",
        Item: {
            id: { N: String(id) },
            sender_id: { N: String(sender_id) },
            reciever_id: { N: String(reciever_id) },
            message: {S: message},
            sent_at: {S: sent_at},
            recieved_at: {S: recieved_at},
        }
    }
    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addStripe_connected_accounts(id: number, user_id: number, account_id: number, created_at: string, updated_at: string){
    const param = {
        TableName: "stripe_connected_accounts",
        Item: {
            id: { N: String(id) },
            user_id: { N: String(user_id) },
            account_id: { N: String(account_id) },
            created_at: {S: created_at},
            updated_at: {S: updated_at},
        }
    }
    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}